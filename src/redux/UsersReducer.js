import {FollowApi, UserApi} from "../api/api";

const FOLLOW = 'learn/users/FOLLOW';
const DO_NOT_FOLLOW = 'learn/users/DO_NOT_FOLLOW';
const SET_USERS = 'learn/users/SET_USERS';
const SET_USERS_TOTAL_COUNT = 'learn/users/SET_USERS_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'learn/users/SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'learn/users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'learn/users/TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
    users: [],
    totalCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    followingProgress: [],
}

const usersReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userId ? {...user, followed: true} : user)
            }

        case DO_NOT_FOLLOW:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userId ? {...user, followed: false} : user)
            }

        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }

        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingProgress: action.isFollowed ?
                    [...state.followingProgress, action.userId] :
                    state.followingProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }
}

export const followSuccess = userId => ({type: FOLLOW, userId: userId})

export const doNotFollowSuccess = userId => ({type: DO_NOT_FOLLOW, userId: userId})

export const setUsers = users => ({type: SET_USERS, users})

export const setTotalUsersCount = totalCount => ({type: SET_USERS_TOTAL_COUNT, totalCount})

export const setCurrentPage = currentPage => ({type: SET_CURRENT_PAGE, currentPage})

export const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching})

export const toggleFollowingProgress = (isFollowed, userId) => ({type: TOGGLE_FOLLOWING_PROGRESS, isFollowed, userId})

export const requestUsers = (pageSize, currentPage) => {
    return async (dispatch) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(true));
        const data = await UserApi.getUsers(pageSize, currentPage);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followDoNotFollow = (userId, followApi, success) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        const data = await followApi(userId);
        if (data.resultCode === 0) {
            dispatch(success(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    }
}

export const follow = (userId) => {
    return followDoNotFollow(userId, FollowApi.follow.bind(FollowApi), followSuccess);
}

export const doNotFollow = (userId) => {
    return followDoNotFollow(userId, FollowApi.doNotFollow.bind(FollowApi), doNotFollowSuccess);
}

export default usersReducer;
