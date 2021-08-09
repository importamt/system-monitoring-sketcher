import SystemMonitoringSketcher from "./src";

declare global {
    interface Window {
        SystemMonitoringSketcher: any;
    }
}

window.SystemMonitoringSketcher = SystemMonitoringSketcher