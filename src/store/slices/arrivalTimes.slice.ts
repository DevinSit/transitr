import {createSlice} from "@reduxjs/toolkit";
import {crudSliceReducerFactory} from "store/utils";
import mounts from "store/mountpoints";

export const arrivalTimesSlice = createSlice({
    name: mounts.arrivalTimes,
    initialState: {},
    reducers: {
        ...crudSliceReducerFactory("ArrivalTime")
    }
});

/* Selectors */

const getArrivalTimes = (state) => state[mounts.arrivalTimes];

arrivalTimesSlice.selectors = {
    getArrivalTimes
};
