import {Check} from "react-feather";
import './select-options.scss';

const SelectOptions = () => {

    const renderOptions = () => {
        return (
            <div className="select-options-item">
                <div className="select-options-item-content">
                    a10
                </div>
                <div className="select-options-item-icon">
                    <Check color={"blue"}  size={16}/>
                </div>
            </div>
        )
    }

    return (
        <div className="select-options">
            {renderOptions()
            }
        </div>
    );
};

export default SelectOptions;