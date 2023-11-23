import ChipItem from "../chip-item/ChipItem.tsx";
import "./chip-input.scss";
import {ChevronDown, XCircle} from "react-feather";
import { SelectOptionsProps} from "../../../types/SelectType.ts";
import {ChangeEvent} from "react";
import classNames from "classnames";

interface ChipInputProps extends SelectOptionsProps{
    onClear?: () => void;
    onChange?: (e : ChangeEvent<HTMLInputElement>) => void;
    inputValue?: string;
}
const ChipInput = (props : ChipInputProps) => {
    const {options, setSelected, onClear , onChange, inputValue} = props;

    return (
        <div className={"chip-input"}>
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
                        value={inputValue}
                        onChange={onChange}
                        type="text"
                        placeholder={"Please select"}
                    />
                </div>
            </div>
            <div
                className={classNames("chip-input-icon", {
                    "remove": options.length > 0
                })}>
                {
                   options.length === 0 ? <ChevronDown  size={16}/> : <XCircle onClick={onClear} size={16}/>
                }
            </div>
        </div>
    );
};

export default ChipInput;