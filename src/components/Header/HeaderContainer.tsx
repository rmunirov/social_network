import { connect } from 'react-redux';
import { logout } from '../../redux/AuthReducer';
import { TAppState } from '../../redux/store-redux';
import Header from './Header';

type TStateProps = {
    login: string;
    isAuth: boolean;
};

type TDispatchProps = {
    logout: () => void;
};

type TOwnProps = {
    title: string;
};

const mapStateToProps = (state: TAppState) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    };
};

const mapDispatchToProps = {
    logout,
};

export default connect<TStateProps, TDispatchProps, TOwnProps, TAppState>(
    mapStateToProps,
    mapDispatchToProps
)(Header);
