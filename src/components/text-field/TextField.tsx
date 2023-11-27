
import './text-field.scss';
import classNames from "classnames";
import {InputHTMLAttributes} from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>{
    error?: boolean;
    textFieldError?: string;
}
const TextField = (props : TextInputProps) => {
    const {error, textFieldError, ...rest} = props;
    return (
        <div className={"text-field"}>
            <input
                className={classNames({ "error": error })}
                type="text"
                {...rest}
            />
            {
                error &&
                <div className={"text-field-error"}>{textFieldError}</div>
            }
        </div>
    );
};

export default TextField;