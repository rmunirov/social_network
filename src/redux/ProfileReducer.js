import {ProfileApi} from "../api/api";

const ADD_POST = 'learn/profile/ADD_POST';
const SET_PROFILE_DATA = 'learn/profile/SET_PROFILE_DATA';
const SET_STATUS = 'learn/profile/SET_STATUS';
const DELETE_POST = 'learn/profile/DELETE_POST';

const initialState = {
    posts: [
        {id: 1, message: 'Hi, broo', likesCount: 5},
        {id: 2, message: 'How are you?', likesCount: 12},
        {id: 3, message: 'What\'s going on?', likesCount: 44},
        {id: 4, message: 'My name is Yassya', likesCount: 7}
    ],
    newPost: '',
    profile: null,
    status: "",
};

const profileReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: action.newPostText, likesCount: 66}],
            };

        case SET_PROFILE_DATA:
            return {
                ...state,
                profile: action.profile
            };

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };

        case DELETE_POST:
            return {
                ...state,
                posts: [...state.posts.filter(post => post.id !== action.postId)]
            };

        default:
            return state;
    }
}

export const addPost = (newPostText) => ({type: ADD_POST, newPostText})

export const deletePost = (postId) => ({type: DELETE_POST, postId})

export const setProfile = (profile) => ({type: SET_PROFILE_DATA, profile})

export const updateStatus = (status) => ({type: SET_STATUS, status})

export const getProfile = (userId) => {
    return async (dispatch) => {
        const data = await ProfileApi.getProfile(userId);
        dispatch(setProfile(data));
    }
}

export const setStatus = (status) => {
    return async (dispatch) => {
        const data = await ProfileApi.setStatus(status);
        if (data.resultCode === 0) {
            dispatch(updateStatus(status));
        }
    }
}

export const getStatus = (userId) => {
    return async (dispatch) => {
        const data = await ProfileApi.getStatus(userId);
        dispatch(updateStatus(data));
    }
}

export default profileReducer;