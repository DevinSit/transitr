import {createSelector} from "@reduxjs/toolkit";
import {ArrivalTime, ArrivalTimeSet, Route} from "models/";
import {appSlice, arrivalTimesSlice, arrivalTimeSetsSlice, routesSlice} from "./slices";
import {State} from "./types";

/* Types */

export type ArrivalTimesState = {[id: string]: ArrivalTime};
export type ArrivalTimeSetsState = {[id: string]: ArrivalTimeSet};
export type RoutesState = {[id: string]: Route};

/* Cross-slice Selectors */

const getArrivalTimeSetsById = createSelector(
    [
        arrivalTimesSlice.selectors.getArrivalTimes,
        arrivalTimeSetsSlice.selectors.getArrivalTimeSets
    ],
    (arrivalTimesById: State, arrivalTimeSetsById: State) => (
        Object.keys(arrivalTimeSetsById).reduce((acc: ArrivalTimeSetsState, id: string) => {
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
        Object.keys(routesById).reduce((acc: RoutesState, id: string) => {
            acc[id] = Route.populateRoute(arrivalTimeSetsById)(routesById[id]);
            return acc;
        }, {})
    )
);

const getRoutes = createSelector([getRoutesById], (routesById) => Object.values(routesById));

const getSortedRoutes = createSelector(
    [getRoutes, appSlice.selectors.getSortMethod],
    (routes: Array<Route>, sortMethod: Route.SortMethod) => Route.sortRoutes(routes, sortMethod)
);

const getRoute = (id: string) => createSelector([getRoutesById], (byId: State) => byId[id]);

const getRouteByTextCode = (textCode: string) => createSelector(
    [getRoutes],
    (routes) => routes.filter((route) => route.smsTextCode === textCode)[0]
);

export const crossSliceSelectors = {
    getArrivalTimeSetsById,
    getRoutesById,
    getRoutes,
    getRoute,
    getSortedRoutes,
    getRouteByTextCode
};
