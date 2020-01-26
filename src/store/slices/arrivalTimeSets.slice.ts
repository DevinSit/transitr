import {createSlice} from "@reduxjs/toolkit";
import {crudSliceReducerFactory} from "store/utils";
import mounts from "store/mountpoints";

export const arrivalTimeSetsSlice = createSlice({
    name: mounts.arrivalTimeSets,
    initialState: {},
    reducers: {
        ...crudSliceReducerFactory("ArrivalTimeSet")
    }
});

/* Selectors */

const getArrivalTimeSets = (state) => state[mounts.arrivalTimeSets];

arrivalTimeSetsSlice.selectors = {
    getArrivalTimeSets
};
