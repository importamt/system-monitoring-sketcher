import {CheckApi} from "./check-api";

export interface Check {
    id: string,
    sourceId: string,
    targetId: string,
    status: string,
    checkTime: number
}

export * from './check-action'
export {CheckReducer} from './check-reducer'
export {CheckSaga} from './check-saga'

export const CheckApiInstance = new CheckApi()
