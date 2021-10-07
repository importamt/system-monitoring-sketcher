import {createAction} from "@reduxjs/toolkit";
import {Check} from "./index";
import {getAsyncActions} from "../../functions/getAsyncActions";

const prefix = 'check'
export const SET_CHECKS = `${prefix}/SET_CHECKS`
export const setChecks = createAction<Check[]>(SET_CHECKS)

export const RETRIEVE_CHECKS = getAsyncActions(`${prefix}/RETRIEVE_CHECKS`)
export const retrieveChecksRequest = createAction(RETRIEVE_CHECKS.request)
export const retrieveChecksSuccess = createAction<Check[]>(RETRIEVE_CHECKS.success)
export const retrieveChecksFail = createAction<any>(RETRIEVE_CHECKS.fail)
