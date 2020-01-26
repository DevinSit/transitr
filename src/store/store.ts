import {routerMiddleware} from "connected-react-router";
import {configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import createSagaMiddleware from "redux-saga";

import mounts from "./mountpoints";
import registerSagas from "./sagas";
import createRootReducer from "./rootReducer";

const persistConfig = {
    key: "transitr",
    storage: AsyncStorage
};

const mockArrivalTime1 = {id: "1", time: "1:00", arrivingSoon: false, arrivalTimeSetId: "1"};
const mockArrivalTime2 = {id: "2", time: "2:00", arrivingSoon: false, arrivalTimeSetId: "1"};
const mockArrivalTime3 = {id: "3", time: "3:00", arrivingSoon: false, arrivalTimeSetId: "1"};
const mockArrivalTimeSet = {id: "1", message: "", created: new Date(), routeId: "1"};

const mockRoute = {id: "1", busNumber: "231", busStop: "Blair", smsTextCode: "Blair 231"};

export default () => {
    const reducer = createRootReducer();

    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];

    const preloadedState = {
        [mounts.arrivalTimes]: {
            1: mockArrivalTime1,
            2: mockArrivalTime2,
            3: mockArrivalTime3
        },
        [mounts.arrivalTimeSets]: {
            1: mockArrivalTimeSet
        },
        [mounts.routes]: {
            1: mockRoute
        }
    };

    const store = configureStore({
        reducer: persistReducer(persistConfig, reducer),
        middleware,
        preloadedState,
        devTools: true
    });

    const persistor = persistStore(store);

    registerSagas(sagaMiddleware);

    return {store, persistor};
};
