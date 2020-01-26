import {createCustomSlice, crudSliceReducerFactory} from "store/utils";
import {State} from "store/utils/types";
import mounts from "store/mountpoints";

export const routesSlice = createCustomSlice({
    name: mounts.routes,
    initialState: {},
    reducers: {
        ...crudSliceReducerFactory("Route")
    }
});

/* Selectors */

const getRoutes = (state: State) => state[mounts.routes];

routesSlice.selectors = {
    getRoutes
};
