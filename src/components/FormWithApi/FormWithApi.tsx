import TextField from "../text-field/TextField.tsx";
import Select from "../select/Select.tsx";
import useFetchArtist from "../../hooks/useFetchArtist.ts";
import {ChangeEvent, useState} from "react";
import "./form-with-api.scss";
import {ItemProps} from "../../types/SelectType.ts";


interface FormState{
    name: string;
    surname: string;
    artist: ItemProps[];
}
const defaultState = {
    name: '',
    surname: '',
    artist: []
}
const FormWithApi = () => {
    const [page, setPage] = useState<number>(1);
    const {error, artists, isLoading, pagination} = useFetchArtist({page: page, perPage: 20});
    const [formState, setFormState] = useState<FormState>(defaultState);

    const [result, setResult] = useState<FormState>(formState);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormState({...formState, [name]: value});
    }

    const handleSubmit = () => {
        setResult(formState);
    }
    return (
        <div className={"form-with-api"}>
            <h2>Utilisation du composant Select dans un formulaire <br/> et récupération des données du composant à
                partir de l'API.</h2>

            <div className={"form"}>
                <TextField
                    onChange={handleChange}
                    error={false}
                    placeholder={"Nom"}
                    name={"name"}
                />
                <TextField
                    onChange={handleChange}
                    error={false}
                    placeholder={"Prénom"}
                    name={"surname"}
                />
                <Select
                    loading={isLoading}
                    error={error}
                    data={
                        artists.map((artist) => {
                            return {
                                id: artist.id,
                                value: artist.title
                            }
                        })
                    }
                    onPaginateOptions={() => {
                        if (
                            pagination &&
                            pagination?.current_page < pagination?.total_pages) {
                            setPage(page + 1);
                        }

                    }
                    }
                    placeholder={"Artiste préférés"}
                    onSelectChange={(selected) =>  setFormState({...formState, artist: [...selected]})}
                />
                <button
                    onClick={handleSubmit}
                >Submit</button>
            </div>
            <div className="result">
                <h2>Resultat</h2>
                <div className="result-content">
                    <p>Nom : {result.name}</p>
                    <p>Prénom : {result.surname}</p>
                    <p>Artiste préférés : {result.artist.map((artist: ItemProps) => artist.value).join(', ')}</p>
                </div>
            </div>
        </div>
    );
};

export default FormWithApi;