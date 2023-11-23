import ChipItem from "../chip-item/ChipItem.tsx";
import "./chip-input.scss";
import {ChevronDown, XCircle} from "react-feather";
import { SelectOptionsProps} from "../../../types/SelectType.ts";
import {ChangeEvent} from "react";
import classNames from "classnames";
import ReactLoading from 'react-loading';

interface ChipInputProps extends SelectOptionsProps{
    onClear?: () => void;
    onChange?: (e : ChangeEvent<HTMLInputElement>) => void;
    inputValue?: string
    placeholder?: string;
    loading?: boolean;
    error?: boolean;
    onClick?: () => void;
}
const ChipInput = (props : ChipInputProps) => {
    const {options, setSelected, onClear , onChange, inputValue, placeholder , error ,  loading, onClick} = props;


    const getPlaceholder = () => {
        if (loading) {
            return "Chargement..."
        }
        if(error) {
            return "Erreur de chargement"
        }
        return placeholder || "Please select" as string;
    }

    return (
        <div

            className={classNames("chip-input",
            {
                 "loading": loading,
                 "error": error
            }
                )}>
            <div className="chip-input-selector">
                {
                    options.map((option, _) => {
                        return (
                            <ChipItem
                                key={`${option.id}_${option.value}`}
                                item={option}
                                removeItem={() => setSelected(option)}
                            />
                        )
                    })
                }

                <div className="chip-input-selector-search">
                    <input
                        onClick={onClick}
                        disabled={loading}
                        value={inputValue}
                        onChange={onChange}
                        type="text"
                        placeholder={getPlaceholder()}
                    />
                </div>
            </div>
            <div
                className={classNames("chip-input-icon", {
                    "remove": options.length > 0
                })}>
                <div>
                    {
                        loading ? <ReactLoading type={"spin"} color={"#ccc"} height={16} width={16}/> : <div>
                                {
                                    options.length === 0 ? <ChevronDown  size={16}/> : <XCircle onClick={onClear} size={16}/>
                                }
                            </div>
                    }
                </div>

            </div>
        </div>
    );
};

export default ChipInput;