import {createSelector} from "@reduxjs/toolkit";
import {createCustomSlice} from "store/utils";
import {Route} from "models/";
import {State} from "store/";
import mounts from "store/mountpoints";

export const appSlice = createCustomSlice({
    name: mounts.app,
    initialState: {sortBy: Route.SORT_BUS_STOP, sortDialogVisible: false},
    reducers: {
        setSortBy: (state: State, action: {payload: string}) => {
            state.sortBy = action.payload;
        },
        setSortDialogVisibility: (state: State, action: {payload: boolean}) => {
            state.sortDialogVisible = action.payload;
        }
    }
});

/* Selectors */

const getAppState = (state: State) => state[mounts.app];

const getSortBy = createSelector([getAppState], (state: State) => state.sortBy);
const getSortDialogVisibility = createSelector([getAppState], (state: State) => state.sortDialogVisible);

appSlice.selectors = {
    getAppState,
    getSortBy,
    getSortDialogVisibility
};
