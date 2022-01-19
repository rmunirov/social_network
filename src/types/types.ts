export type Message = {
    id: number;
    message: string;
    profileId: number;
};

export type Dialog = {
    id: number;
    name: string;
};

export type Post = {
    id: number;
    message: string;
    likesCount: number;
};

export type Contacts = {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
};

export type Photos = {
    small: string;
    large: string;
};

export type Profile = {
    userId: number;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    contacts: Contacts;
    photos: Photos;
};

export type Friend = {
    id: number;
    name: string;
    age: number;
};

export type User = {
    id: number;
    name: string;
    status: string;
    photos: Photos;
    followed: boolean;
};

export type Users = {
    items: Array<User>;
    totalCount: number;
    error: string;
};
