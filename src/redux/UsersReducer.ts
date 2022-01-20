import { FollowApi, UserApi } from '../api/api';
import { TUser } from '../types/types';

const FOLLOW = 'learn/users/FOLLOW';
const DO_NOT_FOLLOW = 'learn/users/DO_NOT_FOLLOW';
const SET_USERS = 'learn/users/SET_USERS';
const SET_USERS_TOTAL_COUNT = 'learn/users/SET_USERS_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'learn/users/SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'learn/users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'learn/users/TOGGLE_FOLLOWING_PROGRESS';

type UsersState = {
    users: Array<TUser>;
    totalCount: number;
    pageSize: number;
    currentPage: number;
    isFetching: boolean;
    followingProgress: Array<number>;
};

const initialState: UsersState = {
    users: [],
    totalCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    followingProgress: [],
};

const usersReducer = (state: UsersState = initialState, action: any) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.userId ? { ...user, followed: true } : user
                ),
            };

        case DO_NOT_FOLLOW:
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.userId ? { ...user, followed: false } : user
                ),
            };

        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
            };

        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount,
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };

        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingProgress: action.isFollowed
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter((id) => id !== action.userId),
            };

        default:
            return state;
    }
};

type FollowSuccessActionType = {
    type: typeof FOLLOW;
    userId: number;
};

export const followSuccess = (userId: number): FollowSuccessActionType => ({
    type: FOLLOW,
    userId: userId,
});

type DoNotFollowSuccessActionType = {
    type: typeof DO_NOT_FOLLOW;
    userId: number;
};

export const doNotFollowSuccess = (userId: number): DoNotFollowSuccessActionType => ({
    type: DO_NOT_FOLLOW,
    userId: userId,
});

type SetUsersActionType = {
    type: typeof SET_USERS;
    users: Array<TUser>;
};

export const setUsers = (users: Array<TUser>): SetUsersActionType => ({ type: SET_USERS, users });

type SetTotalUsersCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT;
    totalCount: number;
};

export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({
    type: SET_USERS_TOTAL_COUNT,
    totalCount,
});

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE;
    currentPage: number;
};

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING;
    isFetching: boolean;
};

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS;
    isFollowed: boolean;
    userId: number;
};

export const toggleFollowingProgress = (
    isFollowed: boolean,
    userId: number
): ToggleFollowingProgressActionType => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFollowed,
    userId,
});

export const requestUsers = (pageSize: number, currentPage: number) => {
    return async (dispatch: any) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(true));
        const data = await UserApi.getUsers(pageSize, currentPage);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    };
};

const followDoNotFollow = (userId: number, followApi: any, success: any) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId));
        const data = await followApi(userId);
        if (data.resultCode === 0) {
            dispatch(success(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    };
};

export const follow = (userId: number) => {
    return followDoNotFollow(userId, FollowApi.follow.bind(FollowApi), followSuccess);
};

export const doNotFollow = (userId: number) => {
    return followDoNotFollow(userId, FollowApi.doNotFollow.bind(FollowApi), doNotFollowSuccess);
};

export default usersReducer;
