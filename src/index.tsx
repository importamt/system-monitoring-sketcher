import ReactDOM from "react-dom";
import React from "react";
import styled from "styled-components";
import {Modifying, Monitoring} from "./pages";
import {GlobalStyles} from "./styles";
import {createStore, System} from "./store";
import {Provider} from "react-redux";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {registerSystemsRequest, SystemApiInstance} from "./store/system";
import {Check, CheckApiInstance} from "./store/check";
import {Link, LinkApiInstance, registerLinksRequest} from "./store/link";
import {setDelay, setMonitoring} from "./store/view/common";

interface IStyledSystemMonitoringSketcher {
    width: number | string,
    height: number | string,
}

export interface SystemMonitoringSketcherOptions extends IStyledSystemMonitoringSketcher {
    retrieveSystems: () => System[],
    registerSystem: (systems: System) => void,
    registerSystems: (systems: System[]) => void,

    delay: number,

    retrieveChecks: () => Check[],
    retrieveLinks: () => Link[],
    registerLink: (link: Link) => void,
    registerLinks: (links: Link[]) => void,
    isMonitoring?: boolean,
}

const store = createStore()
const SystemMonitoringSketcher = (elementId: string, {
    retrieveSystems,
    registerSystem,
    registerSystems,
    registerLinks,
    registerLink,
    retrieveLinks,
    retrieveChecks,
    width,
    height,
    delay = 1000 * 60,
    isMonitoring = true,
}: SystemMonitoringSketcherOptions) => {


    const calculatedWidth = typeof width === 'number' ? `${width}px` : width ? width : '100%'
    const calculatedHeight = typeof height === 'number' ? `${height}px` : height ? height : '100%'

    SystemApiInstance.retrieveSystems = retrieveSystems
    SystemApiInstance.registerSystem = registerSystem
    SystemApiInstance.registerSystems = registerSystems

    LinkApiInstance.registerLinks = registerLinks
    LinkApiInstance.registerLink = registerLink
    LinkApiInstance.retrieveLinks = retrieveLinks

    CheckApiInstance.retrieveChecks = retrieveChecks

    store.dispatch(setMonitoring(isMonitoring))
    store.dispatch(setDelay(delay))

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
    return {
        save: () => {
            const systems = store.getState().system.systems
            const links = store.getState().link.links

            systems && store.dispatch(registerSystemsRequest(systems))
            links && store.dispatch(registerLinksRequest(links))
        }
    }
}

const StyledSystemMonitoringSketcher = styled.main<IStyledSystemMonitoringSketcher>`
  width: ${({width}) => width};
  height: ${({height}) => height};
`

export default SystemMonitoringSketcher
