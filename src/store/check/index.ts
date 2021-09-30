import {CheckApi} from "./check-api";

export enum CheckStatus {
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL',
    EXPIRED = 'EXPIRED',
    NO_RECORDS = 'NO_RECORDS',
}

export interface Check {
    id: string,
    sourceId: string,
    targetId: string,
    status: CheckStatus
}

export * from './check-action'
export {CheckReducer} from './check-reducer'
export {CheckSaga} from './check-saga'

export const CheckApiInstance = new CheckApi()
