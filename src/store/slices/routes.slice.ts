import {createSlice} from "@reduxjs/toolkit";
import {crudSliceReducerFactory} from "store/utils";
import mounts from "store/mountpoints";

export const routesSlice = createSlice({
    name: mounts.routes,
    initialState: {},
    reducers: {
        ...crudSliceReducerFactory("Route")
    }
});