import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../../App';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import './Todolist.css'
import Button from '@mui/material/Button';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <Button
                variant="contained"
                onClick={removeTodolist}
                className={'btn'}
            >x</Button>

        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Button
                            variant="contained"
                            onClick={onClickHandler}
                            className={'btn'}
                        >x</Button>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                variant={props.filter === 'all' ? "outlined" : "contained"}
                color='success'
                onClick={onAllClickHandler}
                className={'btn'}
                size="small"
            >All</Button>

            <Button
                variant={props.filter === 'active' ? "outlined" : "contained"}
                color="secondary"
                onClick={onActiveClickHandler}
                className={'btn'}
                size="small"
            >Active</Button>

            <Button
                variant={props.filter === 'completed' ? "outlined" : "contained"}
                color="error"
                onClick={onCompletedClickHandler}
                className={'btn'}
                size="small"
            >Completed</Button>

        </div>
    </div>
}

