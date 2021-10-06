import React from "react";
import styles from "./FormControls.module.css"

export const TextArea = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps}/>
        </FormControl>
    )
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps}/>
        </FormControl>
    )
}

export const FormControl = ({input, meta, ...props}) => {
    const hasError = (meta.error || meta.submitError) && meta.touched;
    const blockClassName = `${styles.formControl} ${hasError ? styles.blockError : null}`;
    const textClassName = `${styles.formControl} ${hasError ? styles.textError : null}`;
    return (
        <div>
            <div className={blockClassName}>
                {props.children}
            </div>
            {hasError && <span className={textClassName}>{meta.error || meta.submitError}</span>}
        </div>
    )
}

