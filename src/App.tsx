import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'All'|'Completed'|'Active';

function App() {

    const title = 'What must I learn?'

    let [tasks, setTasks]=useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "ReactNative", isDone: false }
    ]);

    //filter-state
    let[filter, setFilter]= useState<FilterValueType>('All');

    //task-removing function
    const removeTask=(taskID: string)=>{
        setTasks(tasks.filter(element=> element.id !== taskID));
    }

    //task-filtering function
    const filterTasks =(filteredTasks: FilterValueType)=> {
        setFilter(filteredTasks);
    }

    //filter-conditioning
    let filtered = tasks;

    if(filter === 'Completed'){
        filtered = tasks.filter(element=>element.isDone);
    }

    if(filter === 'Active'){
        filtered = tasks.filter(element=>!element.isDone);
    }

    //task-adding function
    const addTask=(newTask: string)=>{
        let task = { id: v1(), title: newTask, isDone: false };
        setTasks([task,...tasks]);
    }


    return (
        <div className="App">
         <Todolist
             title={title}
             tasks={filtered}
             removeTask={removeTask}
             filterTasks={filterTasks}
             addTask={addTask}
         />
        </div>
    );
}


export default App;

