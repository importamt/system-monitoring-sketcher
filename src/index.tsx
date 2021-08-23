import ReactDOM from "react-dom";
import React from "react";
import styled from "styled-components";
import {Modifying, Monitoring} from "./pages";
import {GlobalStyles} from "./styles";
import {createStore, System} from "./store";
import {Provider} from "react-redux";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {SystemApiInstance} from "./store/system";

interface IStyledSystemMonitoringSketcher {
    width: number | string,
    height: number | string,
}

export interface SystemMonitoringSketcherOptions extends IStyledSystemMonitoringSketcher {
    getSystems: () => System[],
    setSystem: (systems: System) => void,
    setSystems: (systems: System[]) => void,
    // getChecks: () => Check[],
    // getLinks: () => Link[],
    // setLink: (link: Link) => void,
    // setLinks: (links: Link[]) => void,
    isMonitoring?: boolean,
}

const store = createStore()
const SystemMonitoringSketcher = (elementId: string, {
    getSystems,
    setSystem,
    setSystems,
    width,
    height,
    isMonitoring = true,
}: SystemMonitoringSketcherOptions) => {
    const calculatedWidth = typeof width === 'number' ? `${width}px` : width ? width : '100%'
    const calculatedHeight = typeof height === 'number' ? `${height}px` : height ? height : '100%'

    SystemApiInstance.getSystems = getSystems
    SystemApiInstance.setSystem = setSystem
    SystemApiInstance.setSystems = setSystems

    ReactDOM.render(
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <StyledSystemMonitoringSketcher
                    width={calculatedWidth} height={calculatedHeight}>
                    <GlobalStyles/>
                    {isMonitoring ? <Monitoring/> : <Modifying/>}
                </StyledSystemMonitoringSketcher>
            </DndProvider>
        </Provider>
        , document.getElementById(elementId))
    return 0
}

const StyledSystemMonitoringSketcher = styled.main<IStyledSystemMonitoringSketcher>`
  width: ${({width}) => width};
  height: ${({height}) => height};
`

export default SystemMonitoringSketcher