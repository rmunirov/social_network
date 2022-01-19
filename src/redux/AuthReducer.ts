import { AuthApi, SecurityApi } from '../api/api';

const SET_USER_AUTH_DATA = 'learn/auth/SET_USER_AUTH_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'learn/auth/GET_CAPTCHA_URL_SUCCESS';

type AuthState = {
    id: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
    captchaUrl: string | null;
};

const initialState: AuthState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

const authReducer = (state: AuthState = initialState, action: any) => {
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

type SetUserAuthDataActionPayloadType = {
    id: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
};

type SetUserAuthDataActionType = {
    type: typeof SET_USER_AUTH_DATA;
    payload: SetUserAuthDataActionPayloadType;
};

export const setUserAuthData = (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
): SetUserAuthDataActionType => ({
    type: SET_USER_AUTH_DATA,
    payload: { id, email, login, isAuth },
});

type GetCaptchaUrlSuccessActionPayloadType = {
    captchaUrl: string;
};

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS;
    payload: GetCaptchaUrlSuccessActionPayloadType;
};

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl },
});

export const authMe = () => {
    return async (dispatch: any) => {
        const data = await AuthApi.authMe();
        if (data.resultCode === 0) {
            const { id, email, login } = data.data;
            dispatch(setUserAuthData(id, email, login, true));
        }
    };
};

export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        const url = await SecurityApi.getCaptchaUrl();
        dispatch(getCaptchaUrlSuccess(url.url));
    };
};

export const login = (
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null = null
) => {
    return async (dispatch: any) => {
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
    return async (dispatch: any) => {
        const data = await AuthApi.logout();
        if (data.resultCode === 0) {
            dispatch(setUserAuthData(null, null, null, false));
        }
    };
};

export default authReducer;
