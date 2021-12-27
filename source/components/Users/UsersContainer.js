import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    doNotFollow,
    follow,
    requestUsers,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
} from '../../redux/UsersReducer';
import {
    getCurrentPage,
    getFollowingProgress,
    getIsFetching,
    getPageSize,
    getTotalCount,
    getUsers,
} from '../../redux/UsersSelector';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

function UsersContainer(props) {
    useEffect(() => {
        props.requestUsers(props.pageSize, props.currentPage);
    }, []);

    const onPageChanged = (pageNumber) => {
        props.requestUsers(props.pageSize, pageNumber);
    };
    return (
        <>
            {props.isFetching && <Preloader />}
            <Users
                totalCount={props.totalCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={onPageChanged}
                users={props.users}
                follow={props.follow}
                doNotFollow={props.doNotFollow}
                followingProgress={props.followingProgress}
            />
        </>
    );
}

UsersContainer.propTypes = {
    totalCount: PropTypes.number,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    onPageChanged: PropTypes.func,
    users: PropTypes.array,
    doNotFollow: PropTypes.func,
    follow: PropTypes.func,
    followingProgress: PropTypes.array,
    requestUsers: PropTypes.func,
    isFetching: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalCount: getTotalCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state),
    };
};

const mapDispatchToProps = {
    follow,
    doNotFollow,
    setUsers,
    setTotalUsersCount,
    setCurrentPage,
    requestUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
