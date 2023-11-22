import {X} from "react-feather";
import "./select-item.scss";


const SelectItem = () => {
    return (
             <div className="select-item">
                <span className="select-item-content">a10</span>
                <span className="select-item-remove"><X size={16}/></span>
            </div>

    );
};

export default SelectItem;