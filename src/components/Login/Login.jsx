import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';
import PropTypes from 'prop-types';
import { Input } from '../common/FormControls/FormControls';
import { composeValidators, minLength, required } from '../../utils/validators/validators';
import { login } from '../../redux/AuthReducer';

const LoginReduxForm = ({ onSubmit, captchaUrl }) => {
    return (
        <Form
            onSubmit={onSubmit}
            render={({ submitError, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            name="email"
                            validate={required}
                            component={Input}
                            placeholder="Login"
                        />
                    </div>
                    <div>
                        <Field
                            name="password"
                            validate={composeValidators(minLength(7), required)}
                            component={Input}
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    {submitError && <div>{submitError}</div>}
                    <div>
                        <Field
                            name="rememberMe"
                            component={Input}
                            type="checkbox"
                            placeholder="Login"
                        />{' '}
                        remember me
                    </div>
                    {captchaUrl && <img src={captchaUrl} alt={'captcha'} />}
                    {captchaUrl && <Field name="captcha" validate={required} component={Input} />}
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            )}
        />
    );
};

LoginReduxForm.propTypes = {
    captchaUrl: PropTypes.string,
    onSubmit: PropTypes.func,
};

const LoginForm = ({ login, isAuth, captchaUrl }) => {
    const onSubmit = async (formData) => {
        const message = await login(
            formData.email,
            formData.password,
            formData.rememberMe,
            formData.captcha
        );
        return { [FORM_ERROR]: message };
    };

    if (isAuth) {
        return <Redirect to="/profile" />;
    }

    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    );
};

LoginForm.propTypes = {
    login: PropTypes.func,
    isAuth: PropTypes.bool,
    captchaUrl: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        loginMessage: state.auth.message,
        captchaUrl: state.auth.captchaUrl,
    };
};

const mapDispatchToProps = {
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
