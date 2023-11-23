import {Check} from "react-feather";
import './select-options.scss';
import classNames from "classnames";
import {SelectOptionsProps} from "../../../types/SelectType.ts";



const SelectOptions = (props : SelectOptionsProps) => {
    const {options, setSelected , chips} = props;

    const renderOptions = () => {

        return (
            <>
                {

                        options.map((option, _) => {
                            const isSelected = chips?.some((chip) => chip.id === option?.id);
                        return (
                            <div
                                onClick={() => setSelected(option)}
                                className={classNames("select-options-item", {
                                    "selected": isSelected,
                                })
                                }
                                key={option?.id}>
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
        <div className="select-options">
            {renderOptions()}
        </div>
    );
};

export default SelectOptions;