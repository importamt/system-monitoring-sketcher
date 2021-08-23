export interface IResolutionForStory {
    resolution: IResolution
}

interface IResolution {
    width: string,
    height: string
}

//This is not standard resolution. just for test UI
export const RESOLUTION_TINY: IResolution = {width: '300px', height: '200px'}

export const RESOLUTION_SD: IResolution = {width: '720px', height: '480px'}
export const RESOLUTION_HD: IResolution = {width: '1280px', height: '720px'}
export const RESOLUTION_FHD: IResolution = {width: '1920px', height: '1080px'}

