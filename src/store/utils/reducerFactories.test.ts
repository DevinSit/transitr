import {createSlice} from "redux-starter-kit";
import {crudSliceReducerFactory} from "./reducerFactories";

describe("crudSliceReducerFactory", () => {
    const sliceName = "Account";
    const initialState = {};

    const reducers = crudSliceReducerFactory(sliceName);

    const slice = createSlice({
        slice: sliceName,
        initialState,
        reducers
    });

    const {actions, reducer} = slice;

    it("creates a set of case reducers based on a name", () => {
        expect(reducers.setAccounts).toBeDefined();
        expect(reducers.addAccount).toBeDefined();
        expect(reducers.addAccounts).toBeDefined();
        expect(reducers.deleteAccount).toBeDefined();
        expect(reducers.updateAccount).toBeDefined();
    });

    it("has a reducer for setting the entire state", () => {
        const newState = {a: 1, b: 2};
        const action = actions.setAccounts(newState);

        expect(reducer(initialState, action)).toEqual(newState);
        expect(reducer(newState, action)).toEqual(newState);
    });

    it("has a reducer for adding a single object", () => {
        const newObject = {id: "a", b: 1};
        const newState = {a: newObject};

        const action = actions.addAccount(newObject);

        expect(reducer(initialState, action)).toEqual(newState);
        expect(reducer(newState, action)).toEqual(newState);
    });

    it("has a reducer for adding a set of objects", () => {
        const newObjects = [{id: "a", b: 1}, {id: "b", b: 2}];
        const newState = {a: newObjects[0], b: newObjects[1]};

        const action = actions.addAccounts(newObjects);

        expect(reducer(initialState, action)).toEqual(newState);
        expect(reducer(newState, action)).toEqual(newState);
    });

    it("has a reducer for removing an object", () => {
        const newObject = {id: "a", b: 1};
        const state = {a: newObject};

        const action = actions.deleteAccount(newObject.id);

        expect(reducer(initialState, action)).toEqual(initialState);
        expect(reducer(state, action)).toEqual(initialState);
    });

    it("has a reducer for updating an object", () => {
        const newObject = {id: "a", b: 1};
        const state = {a: newObject};

        const updatedObject = {...newObject, b: 2};
        const updatedState = {a: updatedObject};

        const action = actions.updateAccount(updatedObject);

        expect(reducer(initialState, action)).toEqual(updatedState);
        expect(reducer(state, action)).toEqual(updatedState);
    });
});
