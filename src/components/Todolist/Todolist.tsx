import React, {useState} from "react";
import {FilterValueType} from "../../App";
import classes from "./Todolist.module.css";
import {Input} from "../Input/Input";
import {TitleEditor} from "../TitleEditor/TitleEditor";


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
    alterTaskTitle:(todolistID: string, taskID: string, newTitle: string)=>void
    alterToDoListTitle:(todolistID: string, newTitle: string)=>void
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

    //check-box ticking function
    const onChangeTickCheckBoxHandler = (taskID: string, checkBoxStatus: boolean) => {
        props.tickCheckBox(props.todolistID,taskID,checkBoxStatus);
    }

    //onclick task removing function
    const taskRemoveOnClickHandler = (elementID: string) => {
        props.removeTask(props.todolistID,elementID);
    }

    //task adding handler
    const taskAddingHandler = (inputValue: string) => {
        props.addTask(props.todolistID, inputValue);
    }

    //onclick todolist removing function
    const removeToDoListHandler = () => {
        props.removeToDoList(props.todolistID);
    }

    //changing todolist title function
    const alterToDoListTitleHandler = (newTitle: string) => {
        props.alterToDoListTitle(props.todolistID, newTitle);
    }
    return (
        <div className="App">
            <div>
                <h3>
                    <button onClick={removeToDoListHandler}>X</button>
                    <TitleEditor title={props.title} callBack={alterToDoListTitleHandler}/></h3>

                <Input callBack={taskAddingHandler}/>
                <ul>
                    {props.tasks.map((element, id)=>{

                        //task title changing function
                        const alterTaskTitleHandler = (newTitle: string) => {
                            props.alterTaskTitle(props.todolistID, element.id, newTitle);
                        }
                        return(

                            <li key={id} className={element.isDone ? classes.isDone : ''}>
                                <input
                                    type="checkbox"
                                    checked={element.isDone}
                                    onChange={
                                        (event)=>onChangeTickCheckBoxHandler(element.id, event.currentTarget.checked)}
                                />

                                <TitleEditor title={element.title} callBack={alterTaskTitleHandler}/>

                                <button onClick={()=>taskRemoveOnClickHandler(element.id)}>X</button>
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