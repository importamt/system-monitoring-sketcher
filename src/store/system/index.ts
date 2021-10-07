import {SystemApi} from "./system-api";


export interface System {
    id: string,
    name: string,

    //http url for checking system
    url: string,
    //x-pixel coordinate on diagram
    x: number,
    //y-pixel coordinate on diagram
    y: number

    //Check system is assigned or not
    isAssigned: boolean,
}

export * from './system-action'
export {SystemReducer} from './system-reducer'
export {SystemSaga} from './system-saga'



export const SystemApiInstance = new SystemApi()
