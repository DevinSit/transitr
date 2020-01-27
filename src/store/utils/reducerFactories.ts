import {
    State, PayloadObject, ObjectPayloadAction, ArrayPayloadAction, IdPayloadAction, ReducerFactory
} from "store/";

/* Creates a set of case reducers for use with something
 * like redux-starter-kit's 'createReducer' or 'createSlice'.
 *
 * Should be used for slices that use an indexed state; that is,
 * whose initial state is an empty object, and whose indexed objects
 * have an ID property.
 */
export const crudSliceReducerFactory = (sliceName: string): ReducerFactory => ({
    [`set${sliceName}s`]: (state: State, action: ObjectPayloadAction): PayloadObject => action.payload,
    [`add${sliceName}`]: (state: State, action: ObjectPayloadAction): void => {
        // Expects an object with an ID as payload
        state[action.payload.id] = action.payload;
    },
    [`add${sliceName}s`]: (state: State, action: ArrayPayloadAction): void => {
        // Expects an array of objects with IDs as payload
        action.payload.forEach((sliceObject) => {
            state[sliceObject.id] = sliceObject;
        });
    },
    [`delete${sliceName}`]: (state: State, action: IdPayloadAction): void => {
        // Expects an ID as payload
        delete state[action.payload];
    },
    [`update${sliceName}`]: (state: State, action: ObjectPayloadAction): void => {
        // Expects an object with an ID as payload
        state[action.payload.id] = action.payload;
    }
});
