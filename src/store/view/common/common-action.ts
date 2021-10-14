import {createAction} from "@reduxjs/toolkit";

const prefix = 'common'
export const SET_MONITORING = `${prefix}/SET_MONITORING`
export const setMonitoring = createAction<boolean>(SET_MONITORING)

export const SET_SCREEN_SIZE = `${prefix}/SET_SCREEN_SIZE`
export const setScreenSize = createAction<{
    width: number,
    height: number,
}>(SET_SCREEN_SIZE)

export const SET_DELAY = `${prefix}/SET_DELAY`
export const setDelay = createAction<number>(SET_DELAY)
