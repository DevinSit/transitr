import {createSelector} from "@reduxjs/toolkit";
import {createCustomSlice} from "store/utils";
import {Route} from "models/";
import {State} from "store/";
import mounts from "store/mountpoints";

export const appSlice = createCustomSlice({
    name: mounts.app,
    initialState: {sortMethod: Route.SortMethod.SORT_BUS_STOP, sortDialogVisible: false},
    reducers: {
        setSortBy: (state: State, action: {payload: Route.SortMethod}) => {
            state.sortMethod = action.payload;
        },
        setSortDialogVisibility: (state: State, action: {payload: boolean}) => {
            state.sortDialogVisible = action.payload;
        }
    }
});

/* Selectors */

const getAppState = (state: State) => state[mounts.app];

const getSortMethod = createSelector([getAppState], (state: State) => state.sortMethod);
const getSortDialogVisibility = createSelector([getAppState], (state: State) => state.sortDialogVisible);

appSlice.selectors = {
    getAppState,
    getSortMethod,
    getSortDialogVisibility
};
