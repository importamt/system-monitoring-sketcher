import {createAction} from "@reduxjs/toolkit";
import {System} from "./index";
import {getAsyncActions} from "../../utils";

const prefix = 'system'
export const FETCH_SYSTEMS = `${prefix}/SET_SYSTEMS`
export const fetchSystems = createAction<System[]>(FETCH_SYSTEMS)

export const GET_SYSTEMS = getAsyncActions(`${prefix}/GET_SYSTEMS`)
export const getSystemsRequest = createAction(GET_SYSTEMS.request)
export const getSystemsSuccess = createAction<System[]>(GET_SYSTEMS.success)
export const getSystemsFail = createAction<any>(GET_SYSTEMS.fail)

export const SET_SYSTEM = getAsyncActions(`${prefix}/SET_SYSTEM`)
export const setSystemRequest = createAction<System>(SET_SYSTEM.request)
export const setSystemSuccess = createAction(SET_SYSTEM.success)
export const setSystemFail = createAction<any>(SET_SYSTEM.fail)

export const SET_SYSTEMS = getAsyncActions(`${prefix}/SET_SYSTEMS`)
export const setSystemsRequest = createAction<System>(SET_SYSTEMS.request)
export const setSystemsSuccess = createAction(SET_SYSTEMS.success)
export const setSystemsFail = createAction<any>(SET_SYSTEMS.fail)