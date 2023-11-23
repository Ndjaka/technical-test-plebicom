import "./select.scss";
import SelectOptions from "./select-options/SelectOptions.tsx";
import ChipInput from "./chip-input/ChipInput.tsx";
import {useState} from "react";
import {ItemProps} from "../../types/SelectType.ts";

const data = [
    {id: 1, value: "a" },
    {id: 2, value: "b", },
    {id: 3, value: "c"},
    {id: 4, value: "d"},
    {id: 5, value: "e"},
    {id: 6, value: "f"},
    {id: 7, value: "g"},
];
const Select = () => {

    const [chips, setChips] = useState<ItemProps[]>([]);

    /**
     * Update selected chips based on the provided option.
     *
     * @param {ItemProps} optionSelected - The option to be updated.
     * @returns {void}
     */
    const updateSelectedChips = (optionSelected: ItemProps): void => {
        setChips((prevChips) =>
            prevChips.some((chip) => chip.id === optionSelected.id)
                ? prevChips.filter((chip) => chip.id !== optionSelected.id)
                : [...prevChips, optionSelected]
        );
    };


    return (
        <div className={"select"}>
            <ChipInput
                options={chips}
                setSelected={updateSelectedChips}
            />
            <SelectOptions
              chips={chips}
              options={data}
              setSelected={updateSelectedChips}
           />
        </div>
    );
};

export default Select;