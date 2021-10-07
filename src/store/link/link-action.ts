import {createAction} from "@reduxjs/toolkit";
import {Link} from ".";
import {getAsyncActions} from "../../functions/getAsyncActions";


const prefix = 'link'
export const SET_LINKS = `${prefix}/SET_LINKS`
export const setLinks = createAction<Link[]>(SET_LINKS)

export const RETRIEVE_LINKS = getAsyncActions(`${prefix}/GET_LINKS`)
export const retrieveLinksRequest = createAction(RETRIEVE_LINKS.request)
export const retrieveLinksSuccess = createAction<Link[]>(RETRIEVE_LINKS.success)
export const retrieveLinksFail = createAction<any>(RETRIEVE_LINKS.fail)

export const REGISTER_LINK = getAsyncActions(`${prefix}/REGISTER_LINK`)
export const registerLinkRequest = createAction<Link>(REGISTER_LINK.request)
export const registerLinkSuccess = createAction(REGISTER_LINK.success)
export const registerLinkFail = createAction<any>(REGISTER_LINK.fail)

export const REGISTER_LINKS = getAsyncActions(`${prefix}/REGISTER_LINKS`)
export const registerLinksRequest = createAction<Link[]>(REGISTER_LINKS.request)
export const registerLinksSuccess = createAction(REGISTER_LINKS.success)
export const registerLinksFail = createAction<any>(REGISTER_LINKS.fail)

