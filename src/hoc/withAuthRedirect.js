import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    };
};
//TODO переписать по образцу с React документации
const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (!props.isAuth) {
            return <Redirect to="/login" />;
        }
        return <Component {...props} />;
    };

    RedirectComponent.propTypes = {
        isAuth: PropTypes.bool,
    };

    return connect(mapStateToProps)(RedirectComponent);
};

export default withAuthRedirect;
