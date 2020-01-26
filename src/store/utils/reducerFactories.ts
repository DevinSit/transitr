/* Creates a set of case reducers for use with something
 * like redux-starter-kit's 'createReducer' or 'createSlice'.
 *
 * Should be used for slices that use an indexed state; that is,
 * whose initial state is an empty object, and whose indexed objects
 * have an ID property.
 */
export const crudSliceReducerFactory = (sliceName) => ({
    [`set${sliceName}s`]: (state, action) => action.payload,
    [`add${sliceName}`]: (state, action) => {
        // Expects an object with an ID as payload
        state[action.payload.id] = action.payload;
    },
    [`add${sliceName}s`]: (state, action) => {
        // Expects an array of objects with IDs as payload
        action.payload.forEach((sliceObject) => {
            state[sliceObject.id] = sliceObject;
        });
    },
    [`delete${sliceName}`]: (state, action) => {
        // Expects an ID as payload
        delete state[action.payload];
    },
    [`update${sliceName}`]: (state, action) => {
        // Expects an object with an ID as payload
        state[action.payload.id] = action.payload;
    }
});
