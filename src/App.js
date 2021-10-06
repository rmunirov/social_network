import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import React, {Component, Suspense} from "react";
import {connect, Provider} from "react-redux";
import {appInitialize} from "./redux/AppReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/store-redux";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

class App extends Component {

    componentDidMount() {
        this.props.appInitialize();
    }

    render() {
        if (!this.props.isInit) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Suspense fallback={<Preloader/>}>
                        <section>
                            <Route path={'/dialogs'} component={DialogsContainer}/>
                            <Route path={'/users'} component={UsersContainer}/>
                        </section>
                    </Suspense>
                    <Route path={'/profile/:userId?'} component={ProfileContainer}/>
                    <Route path={'/news'} component={News}/>
                    <Route path={'/music'} component={Music}/>
                    <Route path={'/settings'} component={Settings}/>
                    <Route path={'/login'} component={Login}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isInit: state.app.isInit
    }
}

const mapDispatchToProps = {
    appInitialize
}

const AppConnect = connect(mapStateToProps, mapDispatchToProps)(App);

const AppWithStore = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <AppConnect/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    );
}

export default AppWithStore;
