import {X} from "react-feather";
import "./chip-item.scss";
import {ChipItemProps} from "../../../types/SelectType.ts";



const ChipItem = (props : ChipItemProps) => {
    const {item, removeItem} = props;
    return (
             <div className="chip-item">
                <span className="chip-item-content">{item.value}</span>
                <span
                    onClick={() => removeItem(item.id)}
                    className="chip-item-remove">
                    <X size={16}/>
                </span>
            </div>

    );
};

export default ChipItem;