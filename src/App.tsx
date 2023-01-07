import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
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


    //list removing function
    const removeToDoList = (todolistID: string) => {
        setToDoLists([...toDoLists.filter(list=>list.id !== todolistID)])
        delete tasks[todolistID];
    }

    //task-removing function
    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]:[...tasks[todolistID].filter(task=>task.id !== taskID)]})
    }

    //task-filtering function
    const filterTasks = (todolistID: string, filteredTasks: FilterValueType) => {
        setToDoLists(toDoLists.map(list=>list.id===todolistID ? {...list, filter: filteredTasks} : list));
    }

    //task-adding function
    const addTask = (todolistID: string, newToDo: string) => {
        const newTask = {id: v1(), title: newToDo, isDone: false};
        setTasks({...tasks, [todolistID]:[newTask,...tasks[todolistID]]})

    }

    //check-box ticking function
    const tickCheckBox = (todolistID: string,taskID: string, checkBoxStatus: boolean) => {
        setTasks({...tasks, [todolistID]:[...tasks[todolistID].map(task=>task.id === taskID ? {...task, isDone:checkBoxStatus} : task)]})
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
                        removeToDoList={removeToDoList}
                    />
                );
            })}

        </div>
    );
}

export default App;
