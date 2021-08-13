/**
 *
 */
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
