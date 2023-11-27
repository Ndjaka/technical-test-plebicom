import {render} from "../../../utils/test-utils.tsx";
import SelectOptions from "./SelectOptions.tsx";
import {vi} from "vitest";

const options = [
    {id: 1, value: 'test'},
    {id: 2, value: 'test2'},
    {id: 3, value: 'test3'},
    {id: 4, value: 'test4'},
    {id: 5, value: 'test5'}
];

describe('SelectOptions', () => {

    it('should render components without crashing', () => {
        const { getByTestId } = render(<SelectOptions  options={[]} setSelected={vi.fn()}/>);
        const selectOptions = getByTestId('select-options');
        expect(selectOptions).toBeInTheDocument();
    });

    it('should render components with options', () => {
        const {getAllByTestId } = render(<SelectOptions  options={options} setSelected={vi.fn()}/>);
        const selectOptions = getAllByTestId('select-options-item');

        expect(selectOptions.length).toBe(options.length);

    });

        it('should not render SelectOptions if there is no options', () => {
            const {queryAllByTitle} = render(<SelectOptions
                options={[]}
                setSelected={vi.fn()}
                showOptions={false}
                />
            );
            const selectOptions = queryAllByTitle('select-options-item');
            expect(selectOptions.length).toBe(0);
        });

     it('should render SelectOptions if there is options', () => {
            const {getAllByTestId} = render(<SelectOptions
                options={options}
                setSelected={vi.fn()}
                showOptions={true}
                />
            );
            const selectOptions = getAllByTestId('select-options-item');
            expect(selectOptions.length).toBe(options.length);
        });
    }


);