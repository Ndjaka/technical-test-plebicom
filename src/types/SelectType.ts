export interface ChipItemProps {
    item: ItemProps;
    removeItem: () => void;
}
export interface ItemProps {
    id : number;
    value: string
}
export interface SelectOptionsProps {
    options: Array<ItemProps>;
    selected?: ItemProps;
    setSelected: (selected: ItemProps) => void;
    chips?: Array<ItemProps>;
}