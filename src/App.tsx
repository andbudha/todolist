import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const title = 'What must I learn?'

    let [tasks, setTasks]=useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "ReactNative", isDone: false }
    ]);


    const removeTask=(taskID: number)=>{
        setTasks(tasks.filter(element=> element.id !== taskID));
    }

    const filterTasks =(filteredTasks: string)=> {
        console.log(filteredTasks);
    }
    return (
        <div className="App">
         <Todolist
             title={title}
             tasks={tasks}
             removeTask={removeTask}
             filterTasks={filterTasks}
         />
        </div>
    );
}


export default App;


/*
import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValueType = 'All'| 'Active'| 'Complete'

function App() {

    const title='What to learn One';

    let [tasks, setTasks]=useState([
        {id: 1, title: 'HTM&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'ReactNative', isDone: false}
    ]);

    let [filter, setFilter]=useState<FilterValueType>('All')

    const removeTask =(taskID: number)=> {
        setTasks(tasks.filter(element=> element.id !== taskID));
    }

    const filteredTasks=(filterValue: FilterValueType)=>{
        setFilter(filterValue);
    }

    let afterFilterTasks = tasks;

    if(filter === 'Active'){
        afterFilterTasks=tasks.filter(element=>!element.isDone);
    }

    if(filter === 'Complete'){
        afterFilterTasks=tasks.filter(element=>element.isDone);
    }

    return (
        <div className="App">
            <Todolist
                title={title}
                tasks={afterFilterTasks}
                removeTask={removeTask}
                filteredTasks={filteredTasks}
            />
        </div>
    );
}

export default App;


 */