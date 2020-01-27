import {all, put, takeEvery} from "redux-saga/effects";
import {Route} from "models/";
import {routesSlice} from "store/";

interface Create {
    payload: Route;
}

function* create({payload}: Create) {
    const route = new Route(payload);
    console.log("Creating route...");

    yield put(routesSlice.actions.addRoute(route));
}

function* routesSaga() {
    yield all([
        takeEvery(routesSlice.actions.createRoute, create)
    ]);
}

export default routesSaga;
