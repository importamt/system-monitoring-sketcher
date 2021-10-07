import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {SET_SYSTEM, SET_SYSTEMS, System} from "./index";

interface SystemState {
    systems?: System[],
    modifyingSystems?: System[]
}

const initialState: SystemState = {}

export const SystemReducer = createReducer(initialState, {
    [SET_SYSTEMS]: (state: SystemState, action: PayloadAction<System[]>) => {
        state.systems = action.payload
    },
    [SET_SYSTEM]: (state: SystemState, action: PayloadAction<System>) => {
        const newSystem = action.payload
        state.systems = state.systems?.map(system => system.id === newSystem.id ?
            newSystem : system
        )
    },
})
