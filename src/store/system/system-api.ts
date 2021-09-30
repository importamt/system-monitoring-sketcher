import {System} from "./index";

export class SystemApi {
    private _retrieveSystems: () => System[] = () => {
        console.warn("please implements getSystems")
        return []
    }
    get retrieveSystems(): () => System[] {
        return this._retrieveSystems;
    }
    set retrieveSystems(value: () => System[]) {
        this._retrieveSystems = value;
    }

    private _registerSystem: (systems: System) => void = (systems: System) => {
        console.warn("please implements setSystem")
    }
    get registerSystem(): (systems: System) => void {
        return this._registerSystem;
    }
    set registerSystem(value: (systems: System) => void) {
        this._registerSystem = value;
    }

    private _registerSystems: (systems: System[]) => void = (systems: System[]) => console.warn("please implements setSystems")
    get registerSystems(): (systems: System[]) => void {
        return this._registerSystems;
    }
    set registerSystems(value: (systems: System[]) => void) {
        this._registerSystems = value;
    }
}

