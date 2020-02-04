import {combineReducers} from "redux";
import * as slices from "./slices";

const createRootReducer = () => {
    const reducers = Object.keys(slices).reduce((acc, key) => {
        const {name: mountpoint, reducer} = slices[key];
        acc[mountpoint] = reducer;

        return acc;
    }, {});

    return combineReducers(reducers);
};

export default createRootReducer;
