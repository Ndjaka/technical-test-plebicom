import SelectItem from "./select-item/SelectItem.tsx";
import {ChevronDown} from "react-feather";
import "./select.scss";

const Select = () => {
    return (
        <div className={"select"}>
            <div className="select-selector">
               <SelectItem/>
                <div className="select-selector-search">
                    <input
                        type="text"
                        placeholder={"Please select"}
                    />
                </div>
            </div>
            <div className="select-icon">
                <ChevronDown size={16}/>
            </div>
        </div>
    );
};

export default Select;