import {LinkApi} from "./link-api";

export interface Link {
    id: string,

    sourceId: string,
    targetId: string
}

export * from './link-action'
export {LinkReducer} from './link-reducer'
export {LinkSaga} from './link-saga'

export const LinkApiInstance = new LinkApi()
