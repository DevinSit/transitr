import {createSelector} from "@reduxjs/toolkit";
import {State} from "store/";
import {createCustomSlice, crudSliceReducerFactory} from "store/utils";
import mounts from "store/mountpoints";

export const routesSlice = createCustomSlice({
    name: mounts.routes,
    initialState: {},
    reducers: {
        ...crudSliceReducerFactory("Route"),
        addArrivalTimeSetToRoute: (state, action) => {
            // Expects a ArrivalTimeSet object as payload
            const {id, routeId} = action.payload;

            state = {...state};

            if (state[routeId]) {
                state[routeId] = {...state[routeId]};
                state[routeId].arrivalTimeSetIds = [...state[routeId].arrivalTimeSetIds, id];
            }

            return state;
        },

        /* Saga Only Actions */
        createRoute: (state: State) => state,
        sendSms: (state: State) => state
    }
});

/* Selectors */

const getRoutes = (state: State) => state[mounts.routes];

routesSlice.selectors = {
    getRoutes
};
