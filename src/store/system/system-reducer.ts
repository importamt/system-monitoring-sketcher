import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {FETCH_SYSTEMS, System} from "./index";

interface SystemState {
    systems?: System[]
}

const initialState: SystemState = {}

export const SystemReducer = createReducer(initialState, {
    [FETCH_SYSTEMS]: (state: SystemState, action: PayloadAction<System[]>) => {
        state.systems = action.payload
    }
})