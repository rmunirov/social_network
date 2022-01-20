import { ProfileApi } from '../api/api';
import { TPhotos, TPost, TProfile } from '../types/types';

const ADD_POST = 'learn/profile/ADD_POST';
const SET_PROFILE_DATA = 'learn/profile/SET_PROFILE_DATA';
const SET_STATUS = 'learn/profile/SET_STATUS';
const DELETE_POST = 'learn/profile/DELETE_POST';
const UPDATE_PHOTO = 'learn/profile/UPDATE_PHOTO';

type ProfileState = {
    posts: Array<TPost>;
    newPost: string;
    profile: TProfile | null;
    status: string;
};

const initialState: ProfileState = {
    posts: [
        { id: 1, message: 'Hi, broo', likesCount: 5 },
        { id: 2, message: 'How are you?', likesCount: 12 },
        { id: 3, message: "What's going on?", likesCount: 44 },
        { id: 4, message: 'My name is Yassya', likesCount: 7 },
    ],
    newPost: '',
    profile: null,
    status: '',
};

const profileReducer = (state: ProfileState = initialState, action: any) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, { id: 5, message: action.newPostText, likesCount: 66 }],
            };

        case SET_PROFILE_DATA:
            return {
                ...state,
                profile: action.profile,
            };

        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            };

        case DELETE_POST:
            return {
                ...state,
                posts: [...state.posts.filter((post) => post.id !== action.postId)],
            };

        case UPDATE_PHOTO:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos },
            };

        default:
            return state;
    }
};

type AddPostActionType = {
    type: typeof ADD_POST;
    newPostText: string;
};

export const addPost = (newPostText: string): AddPostActionType => ({
    type: ADD_POST,
    newPostText,
});

type DeletePostActionType = {
    type: typeof DELETE_POST;
    postId: number;
};

export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });

type SetProfileActionType = {
    type: typeof SET_PROFILE_DATA;
    profile: TProfile;
};

export const setProfile = (profile: TProfile): SetProfileActionType => ({
    type: SET_PROFILE_DATA,
    profile,
});

type UpdateStatusActionType = {
    type: typeof SET_STATUS;
    status: string;
};

export const updateStatus = (status: string): UpdateStatusActionType => ({
    type: SET_STATUS,
    status,
});

type SetPhotoActionType = {
    type: typeof UPDATE_PHOTO;
    photos: TPhotos;
};

export const setPhoto = (photos: TPhotos): SetPhotoActionType => ({ type: UPDATE_PHOTO, photos });

export const getProfile = (userId: number) => {
    return async (dispatch: any) => {
        const data = await ProfileApi.getProfile(userId);
        dispatch(setProfile(data));
    };
};

export const setStatus = (status: string) => {
    return async (dispatch: any) => {
        const data = await ProfileApi.setStatus(status);
        if (data.resultCode === 0) {
            dispatch(updateStatus(status));
        }
    };
};

export const getStatus = (userId: number) => {
    return async (dispatch: any) => {
        const data = await ProfileApi.getStatus(userId);
        dispatch(updateStatus(data));
    };
};

export const updatePhoto = (file: any) => {
    return async (dispatch: any) => {
        const data = await ProfileApi.updatePhoto(file);
        if (data.resultCode === 0) {
            dispatch(setPhoto(data.data.photos));
        }
    };
};

export const updateProfile = (profile: TProfile) => {
    return async (dispatch: any, getState: any) => {
        const data = await ProfileApi.updateProfile(profile);
        if (data.resultCode === 0) {
            dispatch(getProfile(getState().auth.id));
        } else {
            if (data.messages.length > 0) {
                return data.messages[0];
            }
        }
    };
};

export default profileReducer;
