import {createSelector} from "reselect";

const getUsersSelector = state => state.usersPage.users

export const getUsers = createSelector(getUsersSelector, users => users.filter(user => true))

export const getTotalCount = state => state.usersPage.totalCount

export const getPageSize = state => state.usersPage.pageSize

export const getCurrentPage = state => state.usersPage.currentPage

export const getIsFetching = state => state.usersPage.isFetching

export const getFollowingProgress = state => state.usersPage.followingProgress
