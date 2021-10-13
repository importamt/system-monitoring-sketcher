import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {SET_MONITORING, SET_SCREEN_SIZE} from "./common-action";


interface CommonState {
    isMonitoring: boolean,
    width: number,
    height: number,
}

const initialState: CommonState = {
    isMonitoring: false,
    width: 1280,
    height: 720
}

export const CommonReducer = createReducer(initialState, {
    [SET_MONITORING]: (state: CommonState, action: PayloadAction<boolean>) => {
        state.isMonitoring = action.payload
    },
    [SET_SCREEN_SIZE]: (state: CommonState, action: PayloadAction<{
        width: number,
        height: number
    }>) => {
        state.width = action.payload.width
        state.height = action.payload.height
    }
})
