import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './AddItemForm.css'
import Button from '@mui/material/Button';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyDown={onKeyPressHandler}
               className={error ? "error" : ""}
        />
        <Button variant="contained" onClick={addItem} className={'btn'}>+</Button>
        {error && <div className={"error-message"}>{error}</div>}
    </div>
}
