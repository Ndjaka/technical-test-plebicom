import SelectItem from "./select-item/SelectItem.tsx";
import {ChevronDown} from "react-feather";
import "./select.scss";
import {Fragment} from "react";
import SelectOptions from "./select-options/SelectOptions.tsx";

const Select = () => {
    return (
        <Fragment>
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
          <SelectOptions/>
        </Fragment>
    );
};

export default Select;