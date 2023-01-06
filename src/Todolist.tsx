import React, {KeyboardEvent,ChangeEvent, useState} from "react";
import {FilterValueType} from "./App";
import classes from "./Todolist.module.css";


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
    filterTasks: (filteredTasks: FilterValueType)=> void
    addTask:(newTask: string)=> void
    tickCheckBox: (elementID: string, eventValueID: boolean)=> void
}

export function Todolist(props: TodoListPropsType) {

    //input states
    const[inputValue, setInputValue]=useState('');
    const[error, setError]=useState<string|null>(null);

    //active filter state
    const[activeFilter, setActiveFilter]=useState('All');

    //input-value-catching function
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }
    //onkeydown input-value-passing function
    const addTaskOnKeyDownHandler = (input: KeyboardEvent<HTMLInputElement>) => {
       setError(null)
        if(input.key === 'Enter'){
            props.addTask(inputValue);
            setInputValue('');
        }
    }

    //onclick input-value-passing function
    const addTaskOnClickHandler = () => {
        if(inputValue.trim() !== ''){
            props.addTask(inputValue.trim());
            setInputValue('');
        } else {
            setError('New task is required!')
        }
    }

    //onclick task filtering functions
    const filterAllTaskOnClickHandler = () => {
        props.filterTasks('All');
        setActiveFilter('All');
    }

    const filterActiveTaskOnClickHandler = () => {
        props.filterTasks('Active');
        setActiveFilter('Active');
    }

    const filterCompletedTaskOnClickHandler = () => {
        props.filterTasks('Completed');
        setActiveFilter('Completed');
    }

    //onclick task removing function
    const taskRemoveOnClickHandler = (elementID: string) => {
        props.removeTask(props.todolistID,elementID);
    }

    //check-box ticking function
    const onChangeTickCheckBoxHandler = (elementID: string, eventValueID: boolean) => {
        props.tickCheckBox(elementID,eventValueID);
    }

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        className={error ? classes.error : ''}
                        value={inputValue}
                        onChange={onChangeInputHandler}
                        onKeyDown={addTaskOnKeyDownHandler}
                    />
                    <button onClick={addTaskOnClickHandler}>+</button>
                    {error && <div className={classes.errorMessage}>{error}</div>}
                </div>
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