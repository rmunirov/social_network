import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './FormControls.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'FormControls';

export const TextArea = (props) => {
    const { input, ...restProps } = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    );
};

TextArea.propTypes = {
    input: PropTypes.object,
};

export const Input = (props) => {
    const { input, ...restProps } = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    );
};

Input.propTypes = {
    input: PropTypes.object,
};

export const FormControl = ({ meta, ...props }) => {
    const hasError = (meta.error || meta.submitError) && meta.touched;
    return (
        <div>
            <div className={cn(CLASS_NAME, { [`${CLASS_NAME}__blockError`]: hasError })}>
                {props.children}
            </div>
            {hasError && (
                <span className={cn(CLASS_NAME, { [`${CLASS_NAME}__textError`]: hasError })}>
                    {meta.error || meta.submitError}
                </span>
            )}
        </div>
    );
};

FormControl.propTypes = {
    children: PropTypes.object,
    meta: PropTypes.object,
};
