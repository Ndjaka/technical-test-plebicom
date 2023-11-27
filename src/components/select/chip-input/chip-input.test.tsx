import {render, userEvent} from "../../../utils/test-utils.tsx";
import ChipInput from "./ChipInput.tsx";
import {vi} from "vitest";
import {fireEvent} from "@testing-library/react";





describe('ChipInput', () => {

    it('should render correctly', () => {
     const {getByTestId} = render(<ChipInput  options={[]}  setSelected={vi.fn()}/>);
     const element = getByTestId("chip-input");
        expect(element).toBeInTheDocument();
        expect(element).toBeVisible();
    });

    it('should render loading', () => {
        const {getByTestId} = render(<ChipInput  options={[]}  setSelected={vi.fn()} loading={true}/>);
        const element = getByTestId("chip-input");
        expect(element).toBeInTheDocument();
        expect(element).toBeVisible();
        expect(element).toHaveClass("loading");
    });

    it('should render error', () => {
        const {getByTestId} = render(<ChipInput  options={[]}  setSelected={vi.fn()} error={true}/>);
        const element = getByTestId("chip-input");
        expect(element).toBeInTheDocument();
        expect(element).toBeVisible();
        expect(element).toHaveClass("error");

    });

    it('should render placeholder', () => {
        const {getByTestId} = render(<ChipInput  options={[]}  setSelected={vi.fn()} placeholder={"test"}/>);
        const element = getByTestId("chip-input-selector-search");
        expect(element).toBeInTheDocument();
        expect(element).toBeVisible();
        expect(element).toHaveAttribute("placeholder", "test");
    });

    it('should render chargerment when state is loading', () => {
        const {getByTestId} = render(<ChipInput  options={[]}  setSelected={vi.fn()} loading={true}/>);
        const element = getByTestId("chip-input-selector-search");
        expect(element).toBeInTheDocument();
        expect(element).toBeVisible();
        expect(element).toHaveAttribute("placeholder", "Chargement...");
    });

    it('should render erreur de chargement when state is error', () => {
        const {getByTestId} = render(<ChipInput  options={[]}  setSelected={vi.fn()} error={true}/>);
        const element = getByTestId("chip-input-selector-search");
        expect(element).toBeInTheDocument();
        expect(element).toBeVisible();
        expect(element).toHaveAttribute("placeholder", "Erreur de chargement");
    });

    it('should render Please select when state is empty', () => {
        const {getByTestId} = render(<ChipInput  options={[]}  setSelected={vi.fn()} />);
        const element = getByTestId("chip-input-selector-search");
        expect(element).toBeInTheDocument();
        expect(element).toBeVisible();
        expect(element).toHaveAttribute("placeholder", "Please select");
    });

    it('should render 3 chips', () => {
        const {debug, getAllByTestId} = render(<ChipInput  options={[{id: 1, value: "test"}, {id: 2, value: "test2"}, {id: 3, value: "test3"}]}  setSelected={vi.fn()} />);
        const element = getAllByTestId("chip-item");
        expect(element.length).toBe(3);
        debug();
    });

    it('it should return the component with deleted chips', () => {
        const { getByTestId, debug, queryAllByTitle,getAllByTestId } = render(
            <ChipInput options={[{ id: 1, value: "test" }]} setSelected={vi.fn()} />
        );

        expect(getAllByTestId("chip-item").length).not.toBe(0);

        fireEvent.click(getByTestId('clear-all-chips'));

        expect(queryAllByTitle("chip-item").length).toBe(0);

        debug();
    });

    it('handle user interaction with search field', () => {

      const {getByPlaceholderText} =  render(<ChipInput options={[{ id: 1, value: "test" }]} setSelected={vi.fn()} />);

      const inputField   = getByPlaceholderText("Please select");
        fireEvent.change(inputField, { target: { value: 'test' } })

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(inputField.value).toBe("test");
    });

    it('should have search field with clearing value', () => {
        const {getByPlaceholderText} =  render(<ChipInput options={[{ id: 1, value: "test" }]} setSelected={vi.fn()} />);
        const inputField = getByPlaceholderText("Please select");
       userEvent.clear(inputField);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(inputField.value).toBe("");
    });
});