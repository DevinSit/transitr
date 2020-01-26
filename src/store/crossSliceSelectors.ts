import {createSelector} from "@reduxjs/toolkit";
import {ArrivalTime, ArrivalTimeSet, Route} from "models/";
import {arrivalTimesSlice, arrivalTimeSetsSlice, routesSlice} from "./slices";

const getArrivalTimeSetsById = createSelector(
    [
        arrivalTimesSlice.selectors.getArrivalTimes,
        arrivalTimeSetsSlice.selectors.getArrivalTimeSets
    ],
    (arrivalTimesById, arrivalTimeSetsById) => Object.keys(arrivalTimeSetsById).reduce((acc, id) => {
        acc[id] = ArrivalTimeSet.populateArrivalTimeSet(arrivalTimesById)(arrivalTimeSetsById[id]);
        return acc;
    }, {})
);

const getRoutesById = createSelector(
    [
        getArrivalTimeSetsById,
        routesSlice.selectors.getRoutes
    ],
    (arrivalTimeSetsById, routesById) => Object.keys(routesById).reduce((acc, id) => {
        acc[id] = Route.populateRoute(arrivalTimeSetsById)(routesById[id]);
        return acc;
    }, {})
);

const getRoutes = createSelector([getRoutesById], (routesById) => Object.values(routesById));

export const crossSliceSelectors = {
    getArrivalTimeSetsById,
    getRoutesById,
    getRoutes
};
