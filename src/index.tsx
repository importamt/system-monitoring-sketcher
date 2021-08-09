import ReactDOM from "react-dom";
import React from "react";

interface SystemMonitoringSketcherOptions {


    width: number | string,
    height: number | string,

}

const SystemMonitoringSketcher = (elementId: string, sketcherOptions: SystemMonitoringSketcherOptions) => {
    console.log("Props : ", elementId, sketcherOptions)
    ReactDOM.render(<h1>HELLO BOTEM : {elementId}</h1>, document.getElementById(elementId))
    return 0
}

export default SystemMonitoringSketcher