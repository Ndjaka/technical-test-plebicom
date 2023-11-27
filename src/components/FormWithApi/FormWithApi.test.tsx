
import FormWithApi from './FormWithApi';
import {render} from "../../utils/test-utils.tsx";
import {fireEvent} from "@testing-library/react";
import {setupServer} from "msw/node";
import {http, HttpResponse} from "msw";
import urls from "../../service/urls.ts";



describe('FormWithApi Component', () => {
    const server = setupServer(
        http.get(urls.getArtists(1,10), () => {
            return HttpResponse.json({
                    data: [
                        {id: 1, title: 'Artist 1'},
                        {id: 2, title: 'Artist 2'},
                        {id: 3, title: 'Artist 3'},
                        {id: 4, title: 'Artist 4'},
                        {id: 5, title: 'Artist 5'},
                    ],
                    pagination: {
                        page: 1,
                        perPage: 20,
                        total: 100,
                        totalPages: 5,
                    },
                },
                {
                    status: 200,
                    statusText: 'OK',
                }
                )
        }
    ))

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())


    it('renders FormWithApi component correctly', () => {
      const {getByText} = render(<FormWithApi />);
        expect(getByText(/Utilisation du composant Select dans un formulaire/i)).toBeInTheDocument();
    });

    it('handles form submission correctly', async () => {
      const {getByPlaceholderText,getByText} =  render(<FormWithApi />);

        fireEvent.change(getByPlaceholderText('Nom'), { target: { value: 'Jane' } });
        fireEvent.change(getByPlaceholderText('Prénom'), { target: { value: 'Sam' } });


        fireEvent.click(getByText('Submit'));

        expect(getByText(/Resultat/i)).toBeInTheDocument();
        expect(getByText(/Nom : Jane/i)).toBeInTheDocument();
        expect(getByText(/Prénom : Sam/i)).toBeInTheDocument();
        expect(getByText(/Artiste préférés/i)).toBeInTheDocument();
    });
/*
    it('handles artist selection correctly', async ()  => {
        const {getByPlaceholderText,getByText,getByTestId,findAllByTestId,debug} =  render(<FormWithApi />);

        fireEvent.change(getByPlaceholderText('Nom'), { target: { value: 'John' } });
        fireEvent.change(getByPlaceholderText('Prénom'), { target: { value: 'Doe' } });

        const inputField = getByTestId("chip-input-selector-search");
        fireEvent.click(inputField);
        fireEvent.change(inputField, {target: {value: 'Artist'}});


        const selectOptions = await findAllByTestId('select-options-item');

        selectOptions.forEach((option) => {
            fireEvent.click(option);
        });

        debug();

        fireEvent.click(getByText('Submit'));



        expect(getByText(/Resultat/i)).toBeInTheDocument();
        expect(getByText(/Nom : John/i)).toBeInTheDocument();
        expect(getByText(/Prénom : Doe/i)).toBeInTheDocument();
        expect(getByText(/Artiste préférés :/i)).toBeInTheDocument();

        fireEvent.click(getByText('Artist 1'));
        fireEvent.click(getByText('Artist 2'));

        expect(getByText(/Artiste préférés : Artist 1, Artist 2/i)).toBeInTheDocument();
    });*/


});
