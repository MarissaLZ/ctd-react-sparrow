import React from "react"
import { useEffect } from "react/cjs/react.production.min"

export default function InputWithLabel(props) {
    //useRef hook creates an imperative ref
    const inputRef = React.useRef()
    
    React.useEffect( () => {
        inputRef.current.focus()
    }, [])

    return(
     <>
        <label htmlFor="todoTitle">{props.children}</label>
        <input id="todoTitle" type="text" name="title" value={props.todoTitle} 
            ref= {inputRef} onChange={props.handleTitleChange}
        />
     </>
    )
}