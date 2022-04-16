import { createStore, compose } from "redux";
import { rootReducer } from "./reducer";
import langs from "../lang";

const initialState = {
    video: null,
    lang: 'Uz',
    langs,
}

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV !== 'production' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// export default store;
export default createStore(
    rootReducer,
    initialState,
    composeEnhancers(),
);