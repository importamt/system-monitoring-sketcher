import ReactDOM from "react-dom";
import React from "react";
import styled from "styled-components";
import {Modifying, Monitoring} from "./pages";
import {GlobalStyles} from "./styles";

interface IStyledSystemMonitoringSketcher {
    width: number | string,
    height: number | string,
}

export interface SystemMonitoringSketcherOptions extends IStyledSystemMonitoringSketcher {
    isMonitoring: boolean
}

const SystemMonitoringSketcher = (elementId: string, {
    width,
    height,
    isMonitoring,
}: SystemMonitoringSketcherOptions) => {
    const calculatedWidth = typeof width === 'number' ? `${width}px` : width ? width : '100%'
    const calculatedHeight = typeof height === 'number' ? `${height}px` : height ? height : '100%'

    ReactDOM.render(
        <StyledSystemMonitoringSketcher
            width={calculatedWidth} height={calculatedHeight}>
            <GlobalStyles/>
            {isMonitoring ? <Monitoring/> : <Modifying/>}
        </StyledSystemMonitoringSketcher>
        , document.getElementById(elementId))
    return 0
}

const StyledSystemMonitoringSketcher = styled.main<IStyledSystemMonitoringSketcher>`
  width: ${({width}) => width};
  height: ${({height}) => height};
`

export default SystemMonitoringSketcher