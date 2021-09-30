import {all, call, put, takeLatest} from "@redux-saga/core/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import {Check, CheckApiInstance, RETRIEVE_CHECKS, retrieveChecksFail, retrieveChecksSuccess, setChecks} from ".";

export const handleRetrieveChecks = function* () {
    try {
        const checks: Check[] = yield call(CheckApiInstance.retrieveChecks)
        yield put(retrieveChecksSuccess(checks))
    } catch (e) {
        yield put(retrieveChecksFail(e))
    }
}
const handleRetrieveChecksSuccess = function* (action: PayloadAction<Check[]>) {
    yield put(setChecks(action.payload))
}

const handleRetrieveChecksFail = function* (error: PayloadAction<any>) {
    console.error("put redux checks FAIL. it will be []", error.payload)
    yield put(setChecks([]))
}

const watchCheck = function* () {
    yield takeLatest(RETRIEVE_CHECKS.request, handleRetrieveChecks)
    yield takeLatest(RETRIEVE_CHECKS.success, handleRetrieveChecksSuccess)
    yield takeLatest(RETRIEVE_CHECKS.fail, handleRetrieveChecksFail)
}

export const CheckSaga = function* () {
    yield all([
        watchCheck()
    ])
}