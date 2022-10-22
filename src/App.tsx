import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    let tasks = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "ReactNative", isDone: false }
    ]

    const removeTask=(taskID: number)=>{
        tasks = tasks.filter(element=> element.id !== taskID);
    }
    return (
        <div className="App">
         <Todolist
             title={'What to learn'}
             tasks={tasks}
             removeTask={removeTask}
         />
        </div>
    );
}


export default App;
