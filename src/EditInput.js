import React from "react"
export default function EditInput({value, handleEditedTodo, handleTitleChange}) {
    
    return(
        <>
            <form onSubmit={handleEditedTodo}>
                <label htmlFor="todoEdit"></label>
                <input 
                    id="todoEdit"
                    className='editInput'
                    type="text"
                    value={value}
                    onChange={handleTitleChange}
                    //onBlur?
                />
            </form>
        </>
    )
}