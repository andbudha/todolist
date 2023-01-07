import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from "../../Todolist.module.css";

type InputPropsType = {
    callBack:(inputValue: string)=>void
}

export const Input = (props: InputPropsType) => {

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
            props.callBack(inputValue);
            setInputValue('');
        }
    }

    //onclick input-value-passing function
    const addTaskOnClickHandler = () => {
        if(inputValue.trim() !== ''){
            props.callBack(inputValue.trim());
            setInputValue('');
        } else {
            setError('New task is required!')
        }
    }
    return (
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
    );
};

