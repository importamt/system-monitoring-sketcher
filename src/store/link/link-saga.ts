import {all, call, put, takeLatest} from "@redux-saga/core/effects";
import {
    REGISTER_LINK,
    REGISTER_LINKS,
    registerLinkFail,
    registerLinksFail,
    registerLinksSuccess,
    registerLinkSuccess,
    RETRIEVE_LINKS,
    retrieveLinksFail,
    retrieveLinksSuccess,
    setLinks
} from "./link-action";
import {Link, LinkApiInstance} from "./index";
import {PayloadAction} from "@reduxjs/toolkit";
import {retrieveSystemsRequest} from "../system/system-action";

export const handleRetrieveLinks = function* () {
    try {
        const links: Link[] = yield call(LinkApiInstance.retrieveLinks)
        console.log("LINKS", links)
        yield put(retrieveLinksSuccess(links))
    } catch (e) {
        yield put(retrieveLinksFail(e))
    }
}
const handleRetrieveLinkSuccess = function* (action: PayloadAction<Link[]>) {
    yield put(setLinks(action.payload))
}
const handleRetrieveLinkFail = function* (error: PayloadAction<any>) {
    console.error("put redux links FAIL. it will be []", error.payload)
    yield put(setLinks([]))
}

const handleRegisterLink = function* (action: PayloadAction<Link>) {
    try {
        yield call(LinkApiInstance.registerLink, action.payload)
        yield put(registerLinkSuccess())
    } catch (e) {
        yield put(registerLinkFail(e))
    }
}
const handleRegisterLinkSuccess = function* () {
    yield put(retrieveSystemsRequest())
}
const handleRegisterLinkFail = function* (action: PayloadAction<any>) {
    console.error("register Link Fail: ", action.payload)
}

const handleRegisterLinks = function* (action: PayloadAction<Link[]>) {
    try {
        yield call(LinkApiInstance.registerLinks, action.payload)
        yield put(registerLinksSuccess())
    } catch (e) {
        yield put(registerLinksFail(e))
    }
}
const handleRegisterLinksSuccess = function* () {
    yield put(retrieveSystemsRequest())
}
const handleRegisterLinksFail = function* (action: PayloadAction<any>) {
    console.error("register Links Fail: ", action.payload)
}


const watchLink = function* () {
    yield takeLatest(RETRIEVE_LINKS.request, handleRetrieveLinks)
    yield takeLatest(RETRIEVE_LINKS.success, handleRetrieveLinkSuccess)
    yield takeLatest(RETRIEVE_LINKS.fail, handleRetrieveLinkFail)

    yield takeLatest(REGISTER_LINK.request, handleRegisterLink)
    yield takeLatest(REGISTER_LINK.success, handleRegisterLinkSuccess)
    yield takeLatest(REGISTER_LINK.fail, handleRegisterLinkFail)

    yield takeLatest(REGISTER_LINKS.request, handleRegisterLinks)
    yield takeLatest(REGISTER_LINKS.success, handleRegisterLinksSuccess)
    yield takeLatest(REGISTER_LINKS.fail, handleRegisterLinksFail)
}

export const LinkSaga = function* () {
    yield all([
        watchLink()
    ])
}
