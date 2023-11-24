export interface ChipItemProps {
    item: ItemProps;
    removeItem: (id: number) => void;
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
    showOptions?: boolean;
    onScroll?: () => void;
}