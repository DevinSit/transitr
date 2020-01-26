import React from "react";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

import AppRouter from "scenes/";
import configureStore from "store/";

const {store, persistor} = configureStore();

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
        </PersistGate>
    </Provider>
);

export default App;
