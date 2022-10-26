import React from "react";
import {FilterValueType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string)=> void
    filterTasks: (filteredTasks: FilterValueType)=> void
}

export function Todolist(props: PropsType) {
    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((element)=>{
                        return(

                            <li key={element.id}>
                                <button onClick={()=>props.removeTask(element.id)}>X</button>
                                <input type="checkbox" checked={element.isDone}/> <span>{element.title}</span>
                            </li>
                        );
                    })}
                </ul>
                <div>
                    <button onClick={()=>{props.filterTasks('All')}}>All</button>
                    <button onClick={()=>{props.filterTasks('Active')}}>Active</button>
                    <button onClick={()=>{props.filterTasks('Completed')}}>Completed</button>
                </div>
            </div>
        </div>
    );
}