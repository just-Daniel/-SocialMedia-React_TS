import React from "react";
import { Field } from "redux-form";
import styles from './FormControls.module.css';

export const FormControls = ({input, meta: {error, touched}, ...props}) => {
    const hasError = error && touched;

    return (
        <div className={ styles.formControl + ' ' + (hasError ? styles.error : '') }>
            <div>
                { props.children }
            </div>
            { hasError && <span>{error}</span> }
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

export const createField = (component, validators, name, placeholder, props = {}, text = '') => (
    <div>
        <Field component={component} 
            validate={validators} 
            name={name}
            placeholder={placeholder} 
            {...props} 
        /> { text }
    </div>
)