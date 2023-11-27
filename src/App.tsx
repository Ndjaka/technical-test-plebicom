import './index.css';
import ComponentWith3State from "./components/componentWith3State/ComponentWith3State.tsx";
import FormWithApi from "./components/FormWithApi/FormWithApi.tsx";

function App() {



  return (
      <div className={"container"}>
      <div
          className={"root"}
      >
          <ComponentWith3State/>
          <FormWithApi/>
      </div>
      </div>
    );

}

export default App;
