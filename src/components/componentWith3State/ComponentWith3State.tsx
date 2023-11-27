// @flow
import Select from "../select/Select.tsx";
import './component-with-state.scss';



const  ComponentWith3State= () => {
    return (
            <div className={"component-with-state"}>
                <h2> Composant avec les trois états</h2>
                <Select
                    loading={false}
                    error={false}
                    onSelectChange={(selected) => console.log(selected)}
                    placeholder={""}
                    data={[
                        {id: 1, value: 'test'},
                        {id: 2, value: 'test2'},
                        {id: 3, value: 'test3'},
                        {id: 4, value: 'test4'},
                        {id: 5, value: 'test5'}
                    ]}
                    selectValue={[
                        {id: 1, value: 'test'},
                        {id: 2, value: 'test2'}
                    ]}

                />
                <Select
                    loading
                    error={false}
                    onSelectChange={(_) => {}}
                    onPaginateOptions={() =>{}}
                    data={[]}

                />
                <Select
                    loading={false}
                    error
                    onSelectChange={(_) => {}}
                    onPaginateOptions={() =>{}}
                    data={[]}
                />
            </div>
    );
};

export default ComponentWith3State;