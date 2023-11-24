import './App.css'
import Select from "./components/select/Select.tsx";
import useFetchArtist from "./hooks/useFetchArtist.ts";

function App() {

  const {error , artists,isLoading} = useFetchArtist({  page: 1, perPage: 8});

  return (
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
            }
        }
      >
          <Select
                loading={isLoading}
                error={error}
              onSelectChange={(selected) => console.log(selected)}
              placeholder={"Please select"}
              onInputChange={(e) => console.log(e.target.value)}
              data={artists?.map((artist) => ({
                    id: artist.id,
                    value: artist.title,
                }))
              }
          />
      </div>
    );

}

export default App
