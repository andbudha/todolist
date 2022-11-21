import React, {KeyboardEvent,ChangeEvent, useState} from "react";
import {FilterValueType} from "./App";
import {Button} from "./components/Button";
import classes from "./Todolist.module.css";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string)=> void
    filterTasks: (filteredTasks: FilterValueType)=> void
    addTask:(newTask: string)=> void
    tickCheckBox: (elementID: string, eventValueID: boolean)=> void
}

export function Todolist(props: TodoListPropsType) {
    //input states
    const[inputValue, setInputValue]=useState('');
    const[error, setError]=useState<string|null>(null);


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

    //onclick task filtering
    const filterTaskOnClickHandler = (buttonName: FilterValueType) => {
        props.filterTasks(buttonName);
    }

    //onclick task removing
    const taskRemoveOnClickHandler = (elementID: string) => {
        props.removeTask(elementID);
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
                    <Button name={'+'} callBack={addTaskOnClickHandler}/>
                    {error && <div className={classes.errorMessage}>{error}</div>}
                </div>
                <ul>
                    {props.tasks.map((element, id)=>{
                        return(

                            <li key={id}>
                                <Button name={'X'} callBack={()=>taskRemoveOnClickHandler(element.id)}/>
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
                    <Button name={'All'} callBack={()=>filterTaskOnClickHandler('All')}/>
                    <Button name={'Active'} callBack={()=>filterTaskOnClickHandler('Active')}/>
                    <Button name={'Completed'} callBack={()=>filterTaskOnClickHandler('Completed')}/>
                </div>
            </div>
        </div>
    );
}