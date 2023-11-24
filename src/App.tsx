import './App.css'
import Select from "./components/select/Select.tsx";
import useFetchArtist from "./hooks/useFetchArtist.ts";
import {useState} from "react";

function App() {

    const [page, setPage] = useState<number>(1);
  const {error , artists,isLoading , pagination} = useFetchArtist({  page: page, perPage: 20});

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
                onPaginateOptions={() =>{
                    if (
                        pagination &&
                        pagination?.current_page < pagination?.total_pages
                    ) {
                    setPage((prevPage) => prevPage + 1)
                    }
                }}

                data={artists?.map((artist) => ({
                    id: artist.id,
                    value: artist.title,
                }))
              }

          />
      </div>
    );

}

export default App;
