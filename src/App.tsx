import './App.css'
import Select from "./components/select/Select.tsx";

function App() {


  return (
      <Select
          onSelectChange={(selected) => console.log(selected)}
          placeholder={"Please select"}
          onInputChange={(e) => console.log(e.target.value)}
          data={[
            {id: 1, value: "Option 1"},
            {id: 2, value: "Option 2"},
            {id: 3, value: "Option 3"},
            {id: 4, value: "Option 4"},
            {id: 5, value: "Option 5"},
            {id: 6, value: "Option 6"}
            ]}
      />);
}

export default App
