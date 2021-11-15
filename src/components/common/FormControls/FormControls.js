import React from "react";
import styles from './FormControls.module.css';

export const FormControls = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched;

    return (
        <div className={ styles.formControl + ' ' + (hasError ? styles.error : '') }>
            <div>
                { props.children }
            </div>
            { hasError && <span>{meta.error}</span> }
        </div>
    )
}

export const Textarea = (props) => {
    const {input, ...restProps} = props;

    return (
        <FormControls {...props}>
            <textarea {...input} {...restProps} />
        </FormControls>
    )
}

export const Input = (props) => {
    const {input, ...restProps} = props;

    return (
        <FormControls {...props}>
            <input {...input} {...restProps} />
        </FormControls>
    )
}