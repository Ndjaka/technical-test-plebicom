import {render} from "../../utils/test-utils.tsx";
import Select from "./Select.tsx";
import {vi} from "vitest";
import {fireEvent} from "@testing-library/react";

const func = vi.fn();

const options = [
    {id: 1, value: 'test'},
    {id: 2, value: 'test2'},
    {id: 3, value: 'test3'},
    {id: 4, value: 'test4'},
    {id: 5, value: 'test5'}
];


describe('Select', () => {


    it('should render components without crashing', () => {
        const {debug, getByTestId} = render(<Select
            data={options}
            onSelectChange={func}
            placeholder={'test'}
            loading={false}
            error={false}
        />);

        const select = getByTestId('select');
        expect(select).toBeInTheDocument();
        debug();
    });

    it('should filter options', () => {
        const {debug, getByTestId, getAllByTestId} = render(<Select
            data={options}
            loading={false}
            error={false}
            onSelectChange={func}
        />);

        const inputField = getByTestId("chip-input-selector-search");
        fireEvent.click(inputField);

        fireEvent.change(inputField, {target: {value: 'test2'}});


        const selectOptions = getAllByTestId('select-options-item');

        expect(selectOptions.length).toBe(1);

        debug();


    });

    it('should have same selected options in Select and ChipInput', () => {
        const {getByTestId, getAllByTestId} = render(<Select
            data={options.slice(0, 2)}
            loading={false}
            error={false}
            onSelectChange={func}
        />);

        const inputField = getByTestId("chip-input-selector-search");
        fireEvent.click(inputField);


        const selectOptions = getAllByTestId('select-options-item');
        selectOptions.forEach((option) => {
            fireEvent.click(option);
        });

        const chipItems = getAllByTestId('chip-item');

        expect(chipItems.length).toBe(selectOptions.length);

    });

    it('should remove 1 chip  from  ChipInput component and SelectOptions Component',  () => {
        const { queryAllByTestId ,getAllByTestId, getByTestId} = render(<Select
            data={options.slice(0, 3)}
            loading={false}
            error={false}
            onSelectChange={func}
        />);

            const inputField = getByTestId("chip-input-selector-search");
            fireEvent.click(inputField);

            const selectOptions = getAllByTestId('select-options-item');

            selectOptions.forEach((option) => {
                fireEvent.click(option);
            });

        const chipItems = queryAllByTestId('chip-item');
        fireEvent.click(chipItems[0]);

        const chipItemsAfterRemove = queryAllByTestId('chip-item');
        expect(chipItemsAfterRemove.length).toBe(2);

        expect(selectOptions[0]).not.toHaveClass('selected');


    }
    );

    it('should remove all chips when click on clear button', () => {
        const {debug, getByTestId,getAllByTestId,queryAllByTestId} = render(<Select
            data={options.slice(0, 3)}
            loading={false}
            error={false}
            onSelectChange={func}
        />);

        const inputField = getByTestId("chip-input-selector-search");
        fireEvent.click(inputField);

        const selectOptions = getAllByTestId('select-options-item');
        selectOptions.forEach((option) => {
            fireEvent.click(option);
        });

        const clearAllChips = getByTestId('clear-all-chips');
        fireEvent.click(clearAllChips);

        const chipItems = queryAllByTestId('chip-item');
        expect(chipItems.length).toBe(0);

        debug();
    });
});