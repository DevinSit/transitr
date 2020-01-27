import React, {useEffect} from "react";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

import AppRouter from "scenes/";
import configureStore from "store/";

import {ArrivalTime, ArrivalTimeSet, Route} from "models/";
import {arrivalTimesSlice, arrivalTimeSetsSlice, routesSlice} from "store/";

const {store, persistor} = configureStore();

const mockArrivalTime1 = {id: "1", time: "1:00", arrivingSoon: false, arrivalTimeSetId: "1"};
const mockArrivalTime2 = {id: "2", time: "2:00", arrivingSoon: false, arrivalTimeSetId: "1"};
const mockArrivalTime3 = {id: "3", time: "3:00", arrivingSoon: false, arrivalTimeSetId: "1"};
const mockArrivalTimeSet = {id: "1", message: "", created: new Date(), routeId: "1", arrivalTimeIds: ["1", "2", "3"]};

const mockRoute = {id: "1", busNumber: "231", busStop: "Blair", smsTextCode: "Blair 231", arrivalTimeSetIds: ["1"]};

const App = () => {
    /* useEffect(() => { */
    /*     store.dispatch(arrivalTimesSlice.actions.addArrivalTime(mockArrivalTime1)); */
    /*     store.dispatch(arrivalTimesSlice.actions.addArrivalTime(mockArrivalTime2)); */
    /*     store.dispatch(arrivalTimesSlice.actions.addArrivalTime(mockArrivalTime3)); */

    /*     store.dispatch(arrivalTimeSetsSlice.actions.addArrivalTimeSet(mockArrivalTimeSet)); */

    /*     store.dispatch(routesSlice.actions.addRoute(mockRoute)); */
    /* }, []); */

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppRouter />
            </PersistGate>
        </Provider>
    );
};

export default App;
