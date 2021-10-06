import {AuthApi} from "../api/api";

const SET_USER_AUTH_DATA = 'learn/auth/SET_USER_AUTH_DATA';

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
};

const authReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_USER_AUTH_DATA:
            return {
                ...state,
                ...action.data,
            };

        default:
            return state;
    }
}

export const setUserAuthData = (id, email, login, isAuth) => ({
    type: SET_USER_AUTH_DATA,
    data: {id, email, login, isAuth}
});

export const authMe = () => {
    return async (dispatch) => {
        const data = await AuthApi.authMe();
        if (data.resultCode === 0) {
            const {id, email, login} = data.data;
            dispatch(setUserAuthData(id, email, login, true));
        }
    }
}

export const login = (email, password, rememberMe = false) => {
    return async (dispatch) => {
        const data = await AuthApi.login(email, password, rememberMe);
        if (data.resultCode === 0) {
            dispatch(authMe());
        } else {
            if (data.messages.length > 0) {
                return data.messages[0];
            }
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        const data = await AuthApi.logout();
        if (data.resultCode === 0) {
            dispatch(setUserAuthData(null, null, null, false));
        }
    }
}

export default authReducer;
