import React, {KeyboardEvent,ChangeEvent, useState} from "react";
import {FilterValueType} from "./App";
import {Button} from "./components/Button";


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
    const taskRemoveOnClickHandler = (elementID: string) => {
        props.removeTask(elementID);
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
                    <Button name={'+'} callBack={addTaskOnClickHandler}/>
                </div>
                <ul>
                    {props.tasks.map((element)=>{
                        return(

                            <li key={element.id}>
                                <Button name={'X'} callBack={()=>taskRemoveOnClickHandler(element.id)}/>
                                <input type="checkbox" checked={element.isDone}/> <span>{element.title}</span>
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