import { authMe } from './AuthReducer';

const SET_IS_INITIALIZED = 'learn/app/SET_IS_INITIALIZED';

type AppState = {
    isInit: boolean;
};

type Action = {
    type: string;
    payload?: any;
};

const initialState: AppState = {
    isInit: false,
};

const appReducer = (state: AppState = initialState, action: Action): AppState => {
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

export const setInitializedState = (): Action => ({ type: SET_IS_INITIALIZED });

export const appInitialize = () => {
    return async (dispatch) => {
        await dispatch(authMe());
        dispatch(setInitializedState());
    };
};

export default appReducer;
