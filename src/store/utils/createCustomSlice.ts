import {createSlice, CreateSliceOptions} from "@reduxjs/toolkit";
import {CustomSlice} from "store/";

const createCustomSlice = (sliceOptions: CreateSliceOptions): CustomSlice => ({
    ...createSlice(sliceOptions),
    selectors: {}
});

export default createCustomSlice;
