import {createSelector} from "@reduxjs/toolkit";
import {ArrivalTime, ArrivalTimeSet, Route} from "models/";
import {arrivalTimesSlice, arrivalTimeSetsSlice, routesSlice} from "./slices";
import {State} from "./utils/types";

/* Types */

type ArrivalTimeSetsById = {[key: string]: ArrivalTimeSet | null};
type RoutesById = {[key: string]: Route | null};

/* Cross-slice Selectors */

const getArrivalTimeSetsById = createSelector(
    [
        arrivalTimesSlice.selectors.getArrivalTimes,
        arrivalTimeSetsSlice.selectors.getArrivalTimeSets
    ],
    (arrivalTimesById: State, arrivalTimeSetsById: State) => (
        Object.keys(arrivalTimeSetsById).reduce((acc: ArrivalTimeSetsById, id: string) => {
            acc[id] = ArrivalTimeSet.populateArrivalTimeSet(arrivalTimesById)(arrivalTimeSetsById[id]);
            return acc;
        }, {})
    )
);

const getRoutesById = createSelector(
    [
        getArrivalTimeSetsById,
        routesSlice.selectors.getRoutes
    ],
    (arrivalTimeSetsById: State, routesById: State) => (
        Object.keys(routesById).reduce((acc: RoutesById, id: string) => {
            acc[id] = Route.populateRoute(arrivalTimeSetsById)(routesById[id]);
            return acc;
        }, {})
    )
);

const getRoutes = createSelector([getRoutesById], (routesById) => Object.values(routesById));

const getRoute = (id: string) => createSelector([getRoutesById], (byId: State) => byId[id]);

export const crossSliceSelectors = {
    getArrivalTimeSetsById,
    getRoutesById,
    getRoutes,
    getRoute
};
