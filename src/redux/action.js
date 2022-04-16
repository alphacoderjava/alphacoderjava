import { SET_LANG, SET_VIDEO_URL } from "./actionTypes";

export const setLang = (value) => ({
    type: SET_LANG,
    payload: value,
})

export const setVideoUrl = (value) => ({
    type: SET_VIDEO_URL,
    payload: value,
})