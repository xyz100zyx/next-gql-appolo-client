"use client";
import { FC, ChangeEvent, memo } from 'react';
import styles from './text-field.module.scss';

type TextFieldProps = {
    onChange: (value: string) => void
} & Partial<{
    value: string,
    label: string
    name: string
    placeholder: string
    error: boolean
    disabled: boolean
    icon: React.ReactElement,
}>

const TextFieldComponent: FC<TextFieldProps> = ({ ...props }) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => { props.onChange(event.target.value) }

    return (
        <div className={styles['field']}>
            {!!props.icon && <div className={styles['field-icon']}>{props.icon}</div>}
            <input className={styles['field-input']} {...props} onChange={handleChange} />
        </div>
    )
}
export const TextField = memo(TextFieldComponent)