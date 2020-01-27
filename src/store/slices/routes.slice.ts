import {State} from "store/";
import {createCustomSlice, crudSliceReducerFactory} from "store/utils";
import mounts from "store/mountpoints";

export const routesSlice = createCustomSlice({
    name: mounts.routes,
    initialState: {},
    reducers: {
        ...crudSliceReducerFactory("Route"),

        /* Saga Only Actions */
        createRoute: (state: State) => state
    }
});

/* Selectors */

const getRoutes = (state: State) => state[mounts.routes];

routesSlice.selectors = {
    getRoutes
};
