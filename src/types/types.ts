export type TMessage = {
    id: number;
    message: string;
    profileId: number;
};

export type TDialog = {
    id: number;
    name: string;
};

export type TPost = {
    id: number;
    message: string;
    likesCount: number;
};

export type TContacts = {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
};

export type TPhotos = {
    small: string;
    large: string;
};

export type TProfile = {
    userId: number;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    contacts: TContacts;
    photos: TPhotos;
};

export type TFriend = {
    id: number;
    name: string;
    age: number;
};

export type TUser = {
    id: number;
    name: string;
    status: string;
    photos: TPhotos;
    followed: boolean;
};

export type TUsers = {
    items: Array<TUser>;
    totalCount: number;
    error: string;
};
