import React, {KeyboardEvent,ChangeEvent, useState} from "react";
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
    addTask:(newTask: string)=> void
}

export function Todolist(props: PropsType) {
    let[inputValue, setInputValue]=useState('');

    //input-value-catching function
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }
    //onkeydown input-value-passing function
    const addTaskOnKeyDownHandler = (input: KeyboardEvent<HTMLInputElement>) => {
        if(input.key === 'Enter'){
            props.addTask(inputValue);
            setInputValue('');
        }
    }

    //onclick input-value-passing function
    const addTaskOnClickHandler = () => {
        props.addTask(inputValue);
        setInputValue('');
    }

    //onclick task filtering
    const filterTaskOnClickHandler = (buttonName: FilterValueType) => {
        props.filterTasks(buttonName);
    }

    //onclick task removing
    const taskRemoveOnClickHandler = (taskID: string) => {
        props.removeTask(taskID);
    }

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={inputValue}
                        onChange={onChangeInputHandler}
                        onKeyDown={addTaskOnKeyDownHandler}
                    />
                    <button onClick={addTaskOnClickHandler}>+</button>
                </div>
                <ul>
                    {props.tasks.map((element)=>{
                        return(

                            <li key={element.id}>
                                <button onClick={()=>taskRemoveOnClickHandler(element.id)}>X</button>
                                <input type="checkbox" checked={element.isDone}/> <span>{element.title}</span>
                            </li>
                        );
                    })}
                </ul>
                <div>
                    <button onClick={()=>filterTaskOnClickHandler('All')}>All</button>
                    <button onClick={()=>filterTaskOnClickHandler('Active')}>Active</button>
                    <button onClick={()=>filterTaskOnClickHandler('Completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
}