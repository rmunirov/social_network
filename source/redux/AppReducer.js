import { authMe } from './AuthReducer';

const SET_IS_INITIALIZED = 'learn/app/SET_IS_INITIALIZED';

const initialState = {
    isInit: false,
};

const appReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {
                ...state,
                isInit: true,
            };

        default:
            return state;
    }
};

export const setInitializedState = () => ({ type: SET_IS_INITIALIZED });

export const appInitialize = () => {
    return async (dispatch) => {
        await dispatch(authMe());
        dispatch(setInitializedState());
    };
};

export default appReducer;
