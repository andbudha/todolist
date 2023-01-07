import React, {KeyboardEvent,ChangeEvent, useState} from "react";
import {FilterValueType} from "./App";
import classes from "./Todolist.module.css";
import {Input} from "./components/Input/Input";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskID: string)=> void
    filterTasks: (todolistID: string, filteredTasks: FilterValueType)=> void
    addTask:(todolistID: string,newTask: string)=> void
    tickCheckBox: (todolistID: string,taskID: string, checkBoxStatus: boolean)=> void
    removeToDoList:(todolistID: string)=>void
}

export function Todolist(props: TodoListPropsType) {



    //active filter state
    const[activeFilter, setActiveFilter]=useState('All');


    //onclick task filtering functions
    const filterAllTaskOnClickHandler = () => {
        props.filterTasks(props.todolistID,'All');
        setActiveFilter('All');
    }

    const filterActiveTaskOnClickHandler = () => {
        props.filterTasks(props.todolistID,'Active');
        setActiveFilter('Active');
    }

    const filterCompletedTaskOnClickHandler = () => {
        props.filterTasks(props.todolistID,'Completed');
        setActiveFilter('Completed');
    }

    //onclick task removing function
    const taskRemoveOnClickHandler = (elementID: string) => {
        props.removeTask(props.todolistID,elementID);
    }

    //check-box ticking function
    const onChangeTickCheckBoxHandler = (taskID: string, checkBoxStatus: boolean) => {
        props.tickCheckBox(props.todolistID,taskID,checkBoxStatus);
    }

    //onclick todolist removing function
    const removeToDoListHandler = () => {
      props.removeToDoList(props.todolistID);
    }

    return (
        <div className="App">
            <div>
                <h3>
                    <button onClick={removeToDoListHandler}>X</button>
                    {props.title}</h3>

                    <Input callBack={()=>{}}/>
                <ul>
                    {props.tasks.map((element, id)=>{
                        return(

                            <li key={id} className={element.isDone ? classes.isDone : ''}>
                                <button onClick={()=>taskRemoveOnClickHandler(element.id)}>X</button>
                                <span>{element.title}</span>
                                <input
                                    type="checkbox"
                                    checked={element.isDone}
                                    onChange={
                                        (event)=>onChangeTickCheckBoxHandler(element.id, event.currentTarget.checked)}
                                />
                            </li>
                        );
                    })}
                </ul>
                <div>
                    <button className={activeFilter === 'All' ? classes.activeFilter : ''} onClick={filterAllTaskOnClickHandler}>All</button>
                    <button className={activeFilter === 'Active' ? classes.activeFilter : ''} onClick={filterActiveTaskOnClickHandler}>Active</button>
                    <button className={activeFilter === 'Completed' ? classes.activeFilter : ''} onClick={filterCompletedTaskOnClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
}