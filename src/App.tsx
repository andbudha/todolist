import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {Input} from "./components/Input/Input";

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

    const addToDoList = (listTitle: string) => {
        const newID = v1();
        const newList: TodoListsType = {id: newID, title: listTitle, filter: 'All'};
        setToDoLists([newList, ...toDoLists])
        setTasks({...tasks, [newID]:[
                {id: v1(), title: 'Rest API-2', isDone: false},
                {id: v1(), title: 'GraphQL-2', isDone: false}
            ]});
    }

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

    //changing task title function
    const alterTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]:[...tasks[todolistID].map(task=>task.id === taskID ? {...task, title: newTitle} : task)]})
    }

    //changing todolist title function
    const alterToDoListTitle = (todolistID: string, newTitle: string) => {
        setToDoLists([...toDoLists.map(list=>list.id === todolistID ? {...list, title: newTitle} : list)]);
    }


    return (
        <div className="App">
            <Input callBack={addToDoList}/>
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
                        alterTaskTitle={alterTaskTitle}
                        alterToDoListTitle={alterToDoListTitle}
                    />
                );
            })}

        </div>
    );
}

export default App;
