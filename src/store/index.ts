import {combineReducers, configureStore, EnhancedStore} from "@reduxjs/toolkit";
import {all, fork} from "@redux-saga/core/effects";
import createSagaMiddleware from "redux-saga";
import {SystemReducer, SystemSaga} from "./system";
import {LinkReducer, LinkSaga} from "./link";
import {CheckReducer, CheckSaga} from "./check";
import {CommonReducer} from "./view/common";

const viewReducer = combineReducers({
    common: CommonReducer
})
const rootReducer = combineReducers({
    view: viewReducer,
    system: SystemReducer,
    link: LinkReducer,
    check: CheckReducer,
})
const rootSaga = function* () {
    yield all([
        fork(SystemSaga),
        fork(LinkSaga),
        fork(CheckSaga),
    ])
}

export type RootState = ReturnType<typeof rootReducer>
export const createStore = (): EnhancedStore<RootState> => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(sagaMiddleware),
        devTools: process.env.NODE_ENV !== "production",
    })
    sagaMiddleware.run(rootSaga)
    return store
}

export {
    System,
    SystemReducer,
    SystemSaga,
} from './system'
