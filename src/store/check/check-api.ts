import {Check} from ".";

export class CheckApi {
    private _retrieveChecks: () => Check[] = () => {
        return []
    }
    get retrieveChecks(): () => Check[] {
        return this._retrieveChecks;
    }

    set retrieveChecks(value: () => Check[]) {
        this._retrieveChecks = value;
    }
}
