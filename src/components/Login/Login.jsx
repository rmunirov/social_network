import React from "react";
import {Field, Form} from "react-final-form";
import {Input} from "../common/FormControls/FormControls";
import {composeValidators, minLength, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/AuthReducer";
import {Redirect} from "react-router-dom";
import {FORM_ERROR} from "final-form";

const LoginReduxForm = ({onSubmit}) => {
    return (
        <Form
            onSubmit={onSubmit}
            render={({submitError, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field name="email" validate={required} component={Input} placeholder="Login"/>
                    </div>
                    <div>
                        <Field name="password"
                               validate={composeValidators(minLength(7), required)}
                               component={Input}
                               type="password"
                               placeholder="Password"/>
                    </div>
                    {submitError && <div>{submitError}</div>}
                    <div>
                        <Field name="rememberMe" component={Input} type="checkbox" placeholder="Login"/> remember me
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            )}
        />
    )
}

const LoginForm = ({login, isAuth}) => {
    const onSubmit = async (formData) => {
        const message = await login(formData.email, formData.password, formData.rememberMe);
        return {[FORM_ERROR]: message}
    }

    if (isAuth) {
        return <Redirect to="/profile"/>
    }

    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        loginMessage: state.auth.message
    }
}

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
