import React from "react";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/validators/validators";
import styles from './FormControls.module.css';

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
};

export const FormControls: React.FC<FormControlPropsType> = ({meta: {error, touched}, ...props}) => {
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
 
export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, ...restProps} = props;

    return (
        <FormControls {...props}>
            <textarea {...input} {...restProps} />
        </FormControls>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, ...restProps} = props;

    return (
        <FormControls {...props}>
            <input {...input} {...restProps} />
        </FormControls>
    )
}

export function createField<FormKeysType extends string> (
    component: React.FC<WrappedFieldProps>, 
    validators: Array<FieldValidatorType>, 
    name: FormKeysType, 
    placeholder: string | undefined, 
    props = {}, 
    text: string = ''
    ) { 
        return <div>
            <Field component={component} 
                validate={validators} 
                name={name}
                placeholder={placeholder} 
                {...props} 
            /> 
            { text }
        </div>
}