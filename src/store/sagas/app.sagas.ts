import {eventChannel} from "redux-saga";
import {all, call, fork, put, select, take, takeEvery} from "redux-saga/effects";
import {ArrivalTimeSet, Route} from "models/";
import {SmsService} from "services/";
import {arrivalTimesSlice, arrivalTimeSetsSlice, routesSlice, crossSliceSelectors} from "store/";

function* sendSms(message: string) {
    const permissionsGranted = yield call(SmsService.requestPermissions);

    if (permissionsGranted) {
        yield call(SmsService.sendTextMessage, message);
    } else {
        // TODO: Exit the app? Somehow?
        console.warn("Failed to acquire permissions");
    }
}

function* receiveSms() {
    const channel = yield call(SmsService.registerReceiver, eventChannel);

    while (true) {
        const {route: smsTextCode, times} = yield take(channel);

        const route = yield select(crossSliceSelectors.getRouteByTextCode(smsTextCode));

        const arrivalTimeSet = ArrivalTimeSet.createFromRawTimes(times);
        arrivalTimeSet.routeId = route.id;

        for (const arrivalTime of arrivalTimeSet.arrivalTimes) {
            yield put(arrivalTimesSlice.actions.addArrivalTime(arrivalTime));
        }

        yield put(arrivalTimeSetsSlice.actions.addArrivalTimeSet(arrivalTimeSet));
        yield put(routesSlice.actions.addArrivalTimeSetToRoute(arrivalTimeSet));
    }
}

// Need the 'type' definition for the action, otherwise typescript
// picks the wrong overload to complain about for the 'takeEvery' in appSaga.
function* createRoute({payload}: {payload: Route, type: string}) {
    const route = new Route(payload);

    yield put(routesSlice.actions.addRoute(route));
    yield call(sendSms, route.smsTextCode);
}

function* appSaga() {
    yield fork(receiveSms);

    yield all([
        takeEvery(routesSlice.actions.createRoute, createRoute)
    ]);
}

export default appSaga;
