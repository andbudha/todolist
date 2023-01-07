import React, {ChangeEvent, useState} from 'react';

type TitleEditorPropsType = {
    title: string
    callBack:(newTitle: string)=>void
}
export const TitleEditor = (props: TitleEditorPropsType) => {
    //title changing states
    const[editor, setEditor]=useState(false);
    const[inputValue, setInputValue]=useState(props.title);

    const setEditorHandler = () => {
      setEditor(!editor);
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
        props.callBack(inputValue);
    }

    return (
        editor
            ? <input value={inputValue} autoFocus onBlur={setEditorHandler} onChange={onChangeInputHandler}/>
            : <span onDoubleClick={setEditorHandler}>{props.title}</span>

    );
};

