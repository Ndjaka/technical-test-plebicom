import{ useState, useEffect, useRef, ChangeEvent } from "react";
import "./select.scss";
import SelectOptions from "./select-options/SelectOptions.tsx";
import ChipInput from "./chip-input/ChipInput.tsx";
import { ItemProps } from "../../types/SelectType.ts";

interface SelectProps {
    data: ItemProps[];
    onSelectChange: (selected: ItemProps[]) => void;
    placeholder?: string;
    inputValue?: string;
    onInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    loading?: boolean;
    error?: boolean;
}

const Select = (props : SelectProps) => {
    const {
        data,
        onSelectChange,
        placeholder,
        inputValue,
        onInputChange,
        error,
        loading,
    } = props;
    const [chips, setChips] = useState<ItemProps[]>([]);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const updateSelectedChips = (optionSelected: ItemProps): void => {
        setChips((prevChips) =>
            prevChips.some((chip) => chip.id === optionSelected.id)
                ? prevChips.filter((chip) => chip.id !== optionSelected.id)
                : [...prevChips, optionSelected]
        );
    };

    useEffect(() => {
        onSelectChange(chips);
    }, [chips]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setShowOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectRef]);

    return (
        <div className={"select"} ref={selectRef}>
            <ChipInput
                onClick={() =>
                    {
                        if (data?.length > 0 && !loading && !error) {
                            setShowOptions(prevOptions => !prevOptions);
                        }
                    }
            }
                loading={loading}
                error={error}
                options={chips || []}
                setSelected={updateSelectedChips}
                onClear={() => setChips([])}
                placeholder={placeholder}
                inputValue={inputValue}
                onChange={onInputChange}
            />
            {showOptions && (
                <SelectOptions
                    showOptions={showOptions}
                    chips={chips || []}
                    options={data || []}
                    setSelected={updateSelectedChips}
                />
            )}
        </div>
    );
};

export default Select;
