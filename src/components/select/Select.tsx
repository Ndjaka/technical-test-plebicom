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
    selectValue?: ItemProps[];
    onPaginateOptions?: () => void;
}

const Select = (props : SelectProps) => {
    const {
        data,
        onSelectChange,
        placeholder,
        inputValue,
        error,
        loading,
        selectValue,
        onPaginateOptions
    } = props;
    const [options, setOptions] = useState<ItemProps[]>([]);
    const [chips, setChips] = useState<ItemProps[]>(selectValue || []);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);

    const updateSelectedChips = (optionSelected: ItemProps): void => {
        setChips((prevChips) =>
            prevChips.some((chip) => chip.id === optionSelected.id)
                ? prevChips.filter((chip) => chip.id !== optionSelected.id)
                : [...prevChips, optionSelected]
        );
    };

    const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setOptions((prevOptions) => {
            if (e.target.value === "") {
                return data;
            }else{
                return prevOptions.filter((option) =>
                    option.value.toLowerCase().includes(e.target.value.toLowerCase())
                );
            }
        });
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

    useEffect(() => {
        if (data?.length > 0)  setOptions(data);
    }, [data]);

    const handleScroll = () => {
        if (onPaginateOptions) {
            const optionRefCurrent = optionsRef?.current;
            if(
                optionRefCurrent &&
                ( optionRefCurrent?.scrollTop + optionRefCurrent?.clientHeight ) ===
                optionRefCurrent?.scrollHeight
            ){
                onPaginateOptions();
            }
        }

    }


    return (
        <div data-testid={"select"}
             className={"select"}
             ref={selectRef}>
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
                onChange={handleFilter}
            />
            {showOptions && (
                <SelectOptions
                    onScroll={handleScroll}
                    ref={optionsRef}
                    showOptions={showOptions}
                    chips={chips || []}
                    options={options}
                    setSelected={updateSelectedChips}
                />
            )}
        </div>
    );
};

export default Select;
