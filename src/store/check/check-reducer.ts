import {Check, SET_CHECKS} from ".";
import {createReducer, PayloadAction} from "@reduxjs/toolkit";

interface CheckState {
    checks?: Check[]
}

const initialState: CheckState = {}

export const CheckReducer = createReducer(initialState, {
    [SET_CHECKS]: (state: CheckState, action: PayloadAction<Check[]>) => {
        state.checks = action.payload
    },
})
