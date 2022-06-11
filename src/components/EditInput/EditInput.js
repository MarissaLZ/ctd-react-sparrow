import React from "react"
import styles from "./EditInput.module.css"
export default function EditInput({value, handleEditedTodo, handleTitleChange}) {
    return(
        <>
            <form onSubmit={handleEditedTodo} className={styles.form}>
                <label htmlFor="todoEdit"></label>
                <input 
                    id="todoEdit"
                    className={styles.input}
                    type="text"
                    value={value}
                    onChange={handleTitleChange}
                />
            </form>
        </>
    )
}