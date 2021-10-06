import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, setStatus} from "../../redux/ProfileReducer";
import {withRouter} from "react-router-dom";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.id;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        id: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}

const mapDispatchToProps = {
    getProfile,
    getStatus,
    setStatus,
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect, withRouter)(ProfileContainer);
