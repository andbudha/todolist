import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'All' | 'Completed' | 'Active';

type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValueType

}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [toDoLists, setToDoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    //task-removing function
    const removeTask = (taskID: string) => {

    }

    //task-filtering function
    const filterTasks = (filteredTasks: FilterValueType) => {

    }

    //task-adding function
    const addTask = (newTask: string) => {

    }

    //check-box ticking function
    const tickCheckBox = (elementID: string, eventValueID: boolean) => {

    }

    return (
        <div className="App">

            {toDoLists.map(list=>{

                //filter-conditioning
                let filtered = tasks[list.id];

                if (list.filter === 'Completed') {
                    filtered = tasks[list.id].filter(element => element.isDone);
                }

                if (list.filter === 'Active') {
                    filtered = tasks[list.id].filter(element => !element.isDone);
                }

                return(
                    <Todolist
                        key={list.id}
                        todolistID={list.id}
                        title={list.title}
                        removeTask={removeTask}
                        filterTasks={filterTasks}
                        addTask={addTask}
                        tickCheckBox={tickCheckBox}
                        tasks={filtered}
                    />
                );
            })}

        </div>
    );
}

export default App;
