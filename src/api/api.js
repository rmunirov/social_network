import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "d3e06826-01ee-4f58-96cd-6e629dc3de5a"}
});

export const UserApi = {
    getUsers(pageSize, currentPage) {
        return instance
            .get(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data);
    }
}

export const FollowApi = {
    follow(userId) {
        return instance
            .post(`follow/${userId}`)
            .then(response => response.data);
    },

    doNotFollow(userId) {
        return instance
            .delete(`follow/${userId}`)
            .then(response => response.data);
    }
}

export const AuthApi = {
    authMe() {
        return instance
            .get(`auth/me`)
            .then(response => response.data);
    },

    login(email, password, rememberMe) {
        return instance
            .post(`auth/login`, {email, password, rememberMe})
            .then(response => response.data);
    },

    logout() {
        return instance
            .delete(`auth/login`)
            .then(response => response.data);
    }
}

export const ProfileApi = {
    getProfile(userId) {
        return instance
            .get(`profile/${userId}`)
            .then(response => response.data);
    },

    getStatus(userId) {
        return instance
            .get(`profile/status/${userId}`)
            .then(response => response.data)
    },

    setStatus(status) {
        return instance
            .put('profile/status', {status})
            .then(response => response.data)
    }
}
