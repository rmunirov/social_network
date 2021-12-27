import React, { Component, Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Application.module.scss';
import {
    DIALOGS_ROUTE,
    LOGIN_ROUTE,
    MUSIC_ROUTE,
    NEWS_ROUTE,
    PROFILE_USERID_ROUTE,
    SETTINGS_ROUTE,
    USERS_ROUTE,
} from './constants/routes';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';
import { appInitialize } from './redux/AppReducer';
import store from './redux/store-redux';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import Preloader from './components/common/Preloader/Preloader';
import ErrorBoundary from './utils/errorBoundary/ErrorBoundary';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

const cn = classNames.bind(styles);
const CLASS_NAME = 'Application';

class Application extends Component {
    componentDidMount() {
        this.props.appInitialize();
    }

    render() {
        if (!this.props.isInit) {
            return <Preloader />;
        }

        return (
            <div className={cn(CLASS_NAME)}>
                <HeaderContainer />
                <Navbar />
                <div>
                    <ErrorBoundary>
                        <Suspense fallback={<Preloader />}>
                            <section>
                                <Route path={DIALOGS_ROUTE} component={DialogsContainer} />
                                <Route path={USERS_ROUTE} component={UsersContainer} />
                            </section>
                        </Suspense>
                        <Route path={PROFILE_USERID_ROUTE} component={ProfileContainer} />
                        <Route path={NEWS_ROUTE} component={News} />
                        <Route path={MUSIC_ROUTE} component={Music} />
                        <Route path={SETTINGS_ROUTE} component={Settings} />
                        <Route path={LOGIN_ROUTE} component={Login} />
                    </ErrorBoundary>
                </div>
            </div>
        );
    }
}

Application.propTypes = {
    appInitialize: PropTypes.func,
    isInit: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        isInit: state.app.isInit,
    };
};

const mapDispatchToProps = {
    appInitialize,
};

const AppConnect = connect(mapStateToProps, mapDispatchToProps)(Application);

const AppWithStore = () => {
    return (
        <React.StrictMode>
            <Router>
                <Provider store={store}>
                    <AppConnect />
                </Provider>
            </Router>
        </React.StrictMode>
    );
};

export default AppWithStore;
