import {Slice} from "@reduxjs/toolkit";

export interface State {
    [key: string]: any;
}

export interface PayloadObject {
    id: string;
}

export type BaseAction = {type: string};

export type ObjectPayloadAction = BaseAction & {payload: PayloadObject};
export type ArrayPayloadAction = BaseAction & {payload: Array<PayloadObject>};
export type IdPayloadAction = BaseAction & {payload: string};

export type CaseReducer = (state: State, action: ObjectPayloadAction & ArrayPayloadAction & IdPayloadAction) => void | PayloadObject;
export type ReducerFactory = {[key: string]: CaseReducer};

export type Selector = (state: State) => any;

export type CustomSlice = Slice & {selectors: {[key: string]: Selector}};
