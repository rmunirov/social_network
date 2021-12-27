import { AuthApi, SecurityApi } from '../api/api';

const SET_USER_AUTH_DATA = 'learn/auth/SET_USER_AUTH_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'learn/auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

const authReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_USER_AUTH_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

export const setUserAuthData = (id, email, login, isAuth) => ({
    type: SET_USER_AUTH_DATA,
    payload: { id, email, login, isAuth },
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl },
});

export const authMe = () => {
    return async (dispatch) => {
        const data = await AuthApi.authMe();
        if (data.resultCode === 0) {
            const { id, email, login } = data.data;
            dispatch(setUserAuthData(id, email, login, true));
        }
    };
};

export const getCaptchaUrl = () => {
    return async (dispatch) => {
        const url = await SecurityApi.getCaptchaUrl();
        dispatch(getCaptchaUrlSuccess(url.url));
    };
};

export const login = (email, password, rememberMe = false, captcha = null) => {
    return async (dispatch) => {
        const data = await AuthApi.login(email, password, rememberMe, captcha);
        if (data.resultCode === 0) {
            dispatch(authMe());
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            if (data.messages.length > 0) {
                return data.messages[0];
            }
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        const data = await AuthApi.logout();
        if (data.resultCode === 0) {
            dispatch(setUserAuthData(null, null, null, false));
        }
    };
};

export default authReducer;
