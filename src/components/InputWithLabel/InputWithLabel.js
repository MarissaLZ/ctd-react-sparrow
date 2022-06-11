import React from "react"
import styles from "./InputWithLabel.module.css"

export default function InputWithLabel({todoTitle, handleTitleChange, children}) {
    //children allows us to pass text node in <InputWithLabel/> instance
    
    //useRef hook creates an imperative ref
    const inputRef = React.useRef()
    
    React.useEffect(() => {
        inputRef.current.focus()
    }, [])
    // auto focus only remains in place w/ Enter key and not when clicking button
    return(
        <div className={styles.container}>
            <label htmlFor="todoTitle">{children}</label>
            <input 
                id="todoTitle"
                type="text"
                name="title"
                value={todoTitle} 
                ref={inputRef}
                onChange={handleTitleChange}
                className={styles.input}
            />
        </div>
    )
}