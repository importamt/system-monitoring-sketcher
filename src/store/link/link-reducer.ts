import {Link, SET_LINKS} from ".";
import {createReducer, PayloadAction} from "@reduxjs/toolkit";

interface LinkState {
    links?: Link[]
}

const initialState: LinkState = {}

export const LinkReducer = createReducer(initialState, {
    [SET_LINKS]: (state: LinkState, action: PayloadAction<Link[]>) => {
        state.links = action.payload
    }
})