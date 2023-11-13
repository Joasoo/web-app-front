import { ReactElement, useState } from 'react'
import '../../App.scss'
import { Loader } from '../loader/Loader'
import './input.scss'

const subtextSize = '0.8em'
type ConfigType = {
    [key in SubtextType['type']]: {
        icon?: ReactElement
        subtextClass?: string
        borderClass?: string
    }
}

const inputConfig: ConfigType = {
    danger: {
        icon: <i className="col bi-dash-circle fit-content text-danger px-1" style={{ fontSize: subtextSize }} />,
        subtextClass: 'text-danger',
        borderClass: 'border-danger',
    },
    warning: {
        icon: (
            <i className="col bi-exclamation-circle fit-content text-warning px-1" style={{ fontSize: subtextSize }} />
        ),
        subtextClass: 'text-warning',
        borderClass: 'border-warning',
    },
    success: {
        icon: <i className="col bi-check-circle fit-content text-success px-1" style={{ fontSize: subtextSize }} />,
        subtextClass: 'text-success',
        borderClass: 'border-success',
    },
    loading: {
        icon: <Loader className="fit-content" size={'1.4em'} />,
        borderClass: 'border-black border-2',
    },
    info: {
        icon: <i className="col bi-exclamation-circle fit-content text-info px-1" style={{ fontSize: subtextSize }} />,
        subtextClass: 'text-info',
        borderClass: 'border-info',
    },
}

export type SubtextType = {
    value: string
    type: 'danger' | 'warning' | 'success' | 'loading' | 'info'
}

type InputCompatibleType = 'text' | 'email' | 'password' | 'date' | 'integer' | 'float'
export type InputProps = {
    value: string | undefined
    onChange: (value: string) => void
    onFocus?: (value: string) => void
    text?: string
    textAlign?: 'start' | 'center' | 'end'
    // Defaults to 'text'
    type?: InputCompatibleType
    disabled?: boolean
    subtext?: SubtextType
    className?: string
}

export const Input = (props: InputProps) => {
    const [errCode, setErrCode] = useState<SubtextType | undefined>()

    const inputType = props.type ?? 'text'
    const inputTextAlign = 'text-' + (props.textAlign ?? 'start')
    const inputDisabled = props.disabled ? 'cursor-disabled' : ''
    const inputClassName = `w-100 custom-input rounded-5 ${inputTextAlign} ${inputDisabled}
                ${props.subtext ? inputConfig[props.subtext?.type].borderClass : 'border-0'}`

    function validate(value: any, type: InputCompatibleType) {
        switch (type) {
            case 'integer': {
                const regex = /^(?:\d+\s?)+$|^(?!.)/
                return RegExp(regex).exec(value as string)
            }

            case 'float': {
                const regex = /^(?:\d+\s?)+(?:(?<!\s)[,.]?|)(?:(?<=[,.])\d+|)$|^(?!.)/
                return RegExp(regex).exec(value as string)
            }

            case 'email': {
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                if (!RegExp(regex).exec(value as string)) {
                    setErrCode({
                        value: 'Not a valid e-mail',
                        type: 'warning',
                    })
                } else {
                    setErrCode(undefined)
                }
                return true
            }

            default: {
                return true
            }
        }
    }

    return (
        <div className={`d-flex flex-column align-items-center ${props.className ?? ''}`}>
            <input
                className={inputClassName}
                placeholder={props.text ?? ''}
                value={props.value ?? ''}
                onChange={(e) => {
                    if (validate(e.target.value, inputType)) props.onChange(e.target.value)
                }}
                onFocus={(e) => {
                    if (props.onFocus) props.onFocus(e.target.value)
                }}
                type={inputType}
                disabled={props.disabled}
            />
            {props.subtext ? (
                <div className={'d-flex flex-row align-items-center justify-content-start'}>
                    <span>{inputConfig[props.subtext.type].icon}</span>
                    <span
                        className={`${inputConfig[props.subtext.type].subtextClass ?? ''} fw-semibold custom-subtext`}
                        style={{ fontSize: subtextSize }}
                    >
                        {props.subtext?.value}
                    </span>
                </div>
            ) : (
                ''
            )}
            {!props.subtext && errCode ? (
                <div className={'d-flex flex-row align-items-center justify-content-start'}>
                    <span>{inputConfig[errCode.type].icon}</span>
                    <span
                        className={`${inputConfig[errCode.type].subtextClass ?? ''} fw-semibold custom-subtext`}
                        style={{ fontSize: subtextSize }}
                    >
                        {errCode?.value}
                    </span>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}
