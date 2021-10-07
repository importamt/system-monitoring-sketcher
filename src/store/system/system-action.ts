import {createAction} from "@reduxjs/toolkit";
import {System} from ".";
import {getAsyncActions} from "../../functions/getAsyncActions";

const prefix = 'system'
export const SET_SYSTEMS = `${prefix}/SET_SYSTEMS`
export const setSystems = createAction<System[]>(SET_SYSTEMS)

export const SET_SYSTEM = `${prefix}/SET_SYSTEM`
export const setSystem = createAction<System>(SET_SYSTEM)

export const RETRIEVE_SYSTEMS = getAsyncActions(`${prefix}/RETRIEVE_SYSTEMS`)
export const retrieveSystemsRequest = createAction(RETRIEVE_SYSTEMS.request)
export const retrieveSystemsSuccess = createAction<System[]>(RETRIEVE_SYSTEMS.success)
export const retrieveSystemsFail = createAction<any>(RETRIEVE_SYSTEMS.fail)

export const REGISTER_SYSTEM = getAsyncActions(`${prefix}/REGISTER_SYSTEM`)
export const registerSystemRequest = createAction<System>(REGISTER_SYSTEM.request)
export const registerSystemSuccess = createAction(REGISTER_SYSTEM.success)
export const registerSystemFail = createAction<any>(REGISTER_SYSTEM.fail)

export const REGISTER_SYSTEMS = getAsyncActions(`${prefix}/REGISTER_SYSTEMS`)
export const registerSystemsRequest = createAction<System[]>(REGISTER_SYSTEMS.request)
export const registerSystemsSuccess = createAction(REGISTER_SYSTEMS.success)
export const registerSystemsFail = createAction<any>(REGISTER_SYSTEMS.fail)
