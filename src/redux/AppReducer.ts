import { authMe } from './AuthReducer';

const SET_IS_INITIALIZED = 'learn/app/SET_IS_INITIALIZED';

type AppState = {
    isInit: boolean;
};

const initialState: AppState = {
    isInit: false,
};

const appReducer = (state: AppState = initialState, action: any): AppState => {
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

type SetInitializedStateActionType = {
    type: typeof SET_IS_INITIALIZED;
};

export const setInitializedState = (): SetInitializedStateActionType => ({
    type: SET_IS_INITIALIZED,
});

export const appInitialize = () => {
    return async (dispatch: any) => {
        await dispatch(authMe());
        dispatch(setInitializedState());
    };
};

export default appReducer;
