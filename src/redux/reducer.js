import { SET_LANG, SET_VIDEO_URL } from "./actionTypes";

export function rootReducer(state = {}, action) {
    switch (action.type) {
        case SET_LANG:
            return {
                ...state,
                lang: action.payload,
            };

        case SET_VIDEO_URL:
            return {
                ...state,
                video: action.payload,
            };

        default:
            return state;
    }
}