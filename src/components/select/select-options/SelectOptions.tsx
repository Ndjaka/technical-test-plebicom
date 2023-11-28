import {Check} from "react-feather";
import './select-options.scss';
import classNames from "classnames";
import {SelectOptionsProps} from "../../../types/SelectType.ts";
import React, {useEffect, useState,memo} from "react";



const SelectOptions = React.forwardRef<HTMLDivElement,SelectOptionsProps>(
    (props : SelectOptionsProps,ref) => {
        const {options, setSelected , chips, showOptions , ...rest} = props;

        const [position, setPosition] = useState<"top"| "bottom">("bottom");

        const updateOptionsPosition = () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const rect = (ref as never)?.current?.getBoundingClientRect();

            if (rect) {
                const windowHeight = window.innerHeight;

                if (rect.top < windowHeight / 3) {
                    setPosition("top");
                } else if (rect.bottom > windowHeight * 2 / 3) {
                    setPosition("bottom");
                }
            }
        };

        useEffect(() => {
            updateOptionsPosition();
            window.addEventListener("scroll", updateOptionsPosition);

            return () => {
                window.removeEventListener("scroll", updateOptionsPosition);
            };
        }, [ref]);

        const styles = {
            top: position === "top" ? "1" : "var(--top)",
            bottom: position === "bottom" ? "0" : "var(--bottom)",
        };

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

        return (
            <div
                data-testid="select-options"
                ref={ref}
                className={classNames("select-options", {
                    "show-options": showOptions
                })}
                style={styles as React.CSSProperties}
                {...rest}
            >
                {renderOptions()}
            </div>
        );
    }
);



export default memo(SelectOptions);