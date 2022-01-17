import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {
    getProfile,
    getStatus,
    setStatus,
    updatePhoto,
    updateProfile,
} from '../../redux/ProfileReducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import Profile from './Profile';

class ProfileContainer extends React.Component {
    getInfo() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.id;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.getInfo();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.getInfo();
        }
    }

    render() {
        return <Profile {...this.props} isOwner={!this.props.match.params.userId} />;
    }
}

ProfileContainer.propTypes = {
    match: PropTypes.object,
    id: PropTypes.number,
    history: PropTypes.array,
    getProfile: PropTypes.func,
    getStatus: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        id: state.auth.id,
        isAuth: state.auth.isAuth,
    };
};

const mapDispatchToProps = {
    getProfile,
    getStatus,
    setStatus,
    updatePhoto,
    updateProfile,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(ProfileContainer);
