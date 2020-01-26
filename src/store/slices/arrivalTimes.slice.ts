import {createCustomSlice, crudSliceReducerFactory} from "store/utils";
import {State} from "store/utils/types";
import mounts from "store/mountpoints";

export const arrivalTimesSlice = createCustomSlice({
    name: mounts.arrivalTimes,
    initialState: {},
    reducers: {
        ...crudSliceReducerFactory("ArrivalTime")
    }
});

/* Selectors */

const getArrivalTimes = (state: State) => state[mounts.arrivalTimes];

arrivalTimesSlice.selectors = {
    getArrivalTimes
};
