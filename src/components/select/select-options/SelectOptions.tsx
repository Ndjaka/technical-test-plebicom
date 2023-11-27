import {Check} from "react-feather";
import './select-options.scss';
import classNames from "classnames";
import {SelectOptionsProps} from "../../../types/SelectType.ts";
import React from "react";



const SelectOptions = React.forwardRef<HTMLDivElement,SelectOptionsProps>(
    (props : SelectOptionsProps,ref) => {
        const {options, setSelected , chips, showOptions , ...rest} = props;

        const renderOptions = () => {

            return (
                <>
                    {


                        options?.map((option, i) => {
                            const isSelected = chips?.some((chip) => chip.id === option?.id);
                            return (
                                <div
                                    data-testid="select-options-item"
                                    onClick={() => setSelected(option)}
                                    className={classNames("select-options-item", {
                                        "selected": isSelected,
                                    })
                                    }
                                    key={`${option.id}_${option.value}_${i}`}>
                                    <div className="select-options-item-content">
                                        {option?.value}
                                    </div>
                                    {
                                        isSelected && ( <div className="select-options-item-icon">
                                            <Check color={"blue"}  size={16}/>
                                        </div>)
                                    }

                                </div>
                            )

                        })
                    }
                </>
            )
        }

        const styles = {
            top: 'var(--top)',
            bottom: 'var(--bottom)',
        }
        return (
            <div
                data-testid="select-options"
                ref={ref}
                className={classNames("select-options", {
                    "show-options": showOptions
                })}
                style={styles}
                {...rest}
            >
                {renderOptions()}
            </div>
        );
    }
);



export default SelectOptions;