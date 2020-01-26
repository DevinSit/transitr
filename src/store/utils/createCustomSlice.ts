import {createSlice, CreateSliceOptions} from "@reduxjs/toolkit";
import {CustomSlice} from "store/utils/types";

const createCustomSlice = (sliceOptions: CreateSliceOptions): CustomSlice => ({
    ...createSlice(sliceOptions),
    selectors: {}
});

export default createCustomSlice;
