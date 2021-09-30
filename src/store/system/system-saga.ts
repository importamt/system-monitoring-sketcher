import {all, call, put, takeLatest} from "@redux-saga/core/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import {
    REGISTER_SYSTEM,
    REGISTER_SYSTEMS,
    registerSystemFail,
    registerSystemsFail,
    registerSystemsSuccess,
    registerSystemSuccess,
    RETRIEVE_SYSTEMS,
    retrieveSystemsFail,
    retrieveSystemsRequest,
    retrieveSystemsSuccess,
    setSystems,
    System,
    SystemApiInstance
} from ".";

export const handleRetrieveSystems = function* () {
    try {
        const systems: System[] = yield call(SystemApiInstance.retrieveSystems)
        yield put(retrieveSystemsSuccess(systems))
    } catch (e) {
        yield put(retrieveSystemsFail(e))
    }
}
const handleRetrieveSystemsSuccess = function* (action: PayloadAction<System[]>) {
    yield put(setSystems(action.payload))
}
const handleRetrieveSystemsFail = function* (error: PayloadAction<any>) {
    console.error("put redux systems FAIL. it will be []", error.payload)
    yield put(setSystems([]))
}

const handleRegisterSystem = function* (action: PayloadAction<System>) {
    try {
        yield call(SystemApiInstance.registerSystem, action.payload)
        yield put(registerSystemSuccess())
    } catch (e) {
        yield put(registerSystemFail(e))
    }
}
const handleRegisterSystemSuccess = function* () {
    yield put(retrieveSystemsRequest())
}
const handleRegisterSystemFail = function* (action: PayloadAction<any>) {
    console.error("register System Fail: ", action.payload)
}

const handleRegisterSystems = function* (action: PayloadAction<System[]>) {
    try {
        yield call(SystemApiInstance.registerSystems, action.payload)
        yield put(registerSystemsSuccess())
    } catch (e) {
        yield put(registerSystemsFail(e))
    }
}
const handleRegisterSystemsSuccess = function* () {
    yield put(retrieveSystemsRequest())
}
const handleRegisterSystemsFail = function* (action: PayloadAction<any>) {
    console.error("register Systems Fail: ", action.payload)
}

const watchSystem = function* () {
    yield takeLatest(RETRIEVE_SYSTEMS.request, handleRetrieveSystems)
    yield takeLatest(RETRIEVE_SYSTEMS.success, handleRetrieveSystemsSuccess)
    yield takeLatest(RETRIEVE_SYSTEMS.fail, handleRetrieveSystemsFail)

    yield takeLatest(REGISTER_SYSTEM.request, handleRegisterSystem)
    yield takeLatest(REGISTER_SYSTEM.success, handleRegisterSystemSuccess)
    yield takeLatest(REGISTER_SYSTEM.fail, handleRegisterSystemFail)

    yield takeLatest(REGISTER_SYSTEMS.request, handleRegisterSystems)
    yield takeLatest(REGISTER_SYSTEMS.success, handleRegisterSystemsSuccess)
    yield takeLatest(REGISTER_SYSTEMS.fail, handleRegisterSystemsFail)
}

export const SystemSaga = function* () {
    yield all([
        watchSystem()
    ])
}