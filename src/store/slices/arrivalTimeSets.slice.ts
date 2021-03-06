import {State} from "store/";
import {createCustomSlice, crudSliceReducerFactory} from "store/utils";
import mounts from "store/mountpoints";

export const arrivalTimeSetsSlice = createCustomSlice({
    name: mounts.arrivalTimeSets,
    initialState: {},
    reducers: {
        ...crudSliceReducerFactory("ArrivalTimeSet")
    }
});

/* Selectors */

const getArrivalTimeSets = (state: State) => state[mounts.arrivalTimeSets];

arrivalTimeSetsSlice.selectors = {
    getArrivalTimeSets
};
