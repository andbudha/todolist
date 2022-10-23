import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValueType = 'All'|'Completed'|'Active';

function App() {

    const title = 'What must I learn?'

    let [tasks, setTasks]=useState<Array<TaskType>>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "ReactNative", isDone: false }
    ]);

    let[filter, setFilter]= useState<FilterValueType>('All');

    const removeTask=(taskID: number)=>{
        setTasks(tasks.filter(element=> element.id !== taskID));
    }

    const filterTasks =(filteredTasks: FilterValueType)=> {
        setFilter(filteredTasks);
    }

    let filtered = tasks;

    if(filter === 'Completed'){
        filtered = tasks.filter(element=>element.isDone);
    }

    if(filter === 'Active'){
        filtered = tasks.filter(element=>!element.isDone);
    }

    return (
        <div className="App">
         <Todolist
             title={title}
             tasks={filtered}
             removeTask={removeTask}
             filterTasks={filterTasks}
         />
        </div>
    );
}


export default App;

