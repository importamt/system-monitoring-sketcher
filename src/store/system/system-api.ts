import {System} from "./index";

export class SystemApi {
    private _getSystems: () => System[] = () => {
        console.warn("please implements getSystems")
        return []
    }

    get getSystems(): () => System[] {
        return this._getSystems;
    }

    set getSystems(value: () => System[]) {
        this._getSystems = value;
    }

    private _setSystem: (systems: System) => void = () => {
        console.warn("please implements setSystem")
    }

    get setSystem(): (systems: System) => void {
        return this._setSystem;
    }

    set setSystem(value: (systems: System) => void) {
        this._setSystem = value;
    }

    private _setSystems: (systems: System[]) => void = () => console.warn("please implements setSystems")

    get setSystems(): (systems: System[]) => void {
        return this._setSystems;
    }

    set setSystems(value: (systems: System[]) => void) {
        this._setSystems = value;
    }
}

