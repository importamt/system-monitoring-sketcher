import {all, call, put, takeLatest} from "@redux-saga/core/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import {System, SystemApiInstance} from "./index";
import {
    fetchSystems,
    GET_SYSTEMS,
    getSystemsFail,
    getSystemsRequest,
    getSystemsSuccess,
    SET_SYSTEM,
    SET_SYSTEMS,
    setSystemFail,
    setSystemSuccess
} from "./system-action";

export const handleGetSystems = function* () {
    try {
        const systems: System[] = yield call(SystemApiInstance.getSystems)
        console.log("SYSTEM SAGA ", systems)
        yield put(getSystemsSuccess(systems))
    } catch (e) {
        yield put(getSystemsFail(e))
    }
}
const handleGetSystemsSuccess = function* (action: PayloadAction<System[]>) {
    yield put(fetchSystems(action.payload))
}
const handleGetSystemsFail = function* (error: PayloadAction<any>) {
    console.error("put redux systems FAIL. it will be []", error.payload)
    yield put(fetchSystems([]))
}

const handleSetSystem = function* (action: PayloadAction<System>) {
    try {
        console.log("SET SYSTEM : ", action.payload)
        yield call(SystemApiInstance.setSystem, action.payload)

        yield put(setSystemSuccess())
    } catch (e) {
        yield put(setSystemFail(e))
    }
}
const handleSetSystemSuccess = function* () {
    yield put(getSystemsRequest())
}
const handleSetSystemFail = function* () {
}

const handleSetSystems = function* () {
}
const handleSetSystemsSuccess = function* () {
}
const handleSetSystemsFail = function* () {
}

const watchSystem = function* () {
    yield takeLatest(GET_SYSTEMS.request, handleGetSystems)
    yield takeLatest(GET_SYSTEMS.success, handleGetSystemsSuccess)
    yield takeLatest(GET_SYSTEMS.fail, handleGetSystemsFail)

    yield takeLatest(SET_SYSTEM.request, handleSetSystem)
    yield takeLatest(SET_SYSTEM.success, handleSetSystemSuccess)
    yield takeLatest(SET_SYSTEM.fail, handleSetSystemFail)

    yield takeLatest(SET_SYSTEMS.request, handleSetSystems)
    yield takeLatest(SET_SYSTEMS.success, handleSetSystemsSuccess)
    yield takeLatest(SET_SYSTEMS.fail, handleSetSystemsFail)
}

export const SystemSaga = function* () {
    yield all([
        watchSystem()
    ])
}