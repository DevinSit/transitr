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

export default () => {
    const reducer = createRootReducer();

    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];

    const preloadedState = {};

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
