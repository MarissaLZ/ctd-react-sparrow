import React from "react"
import { TiDelete } from "react-icons/ti";
import { BiSearch } from "react-icons/bi"
import styles from "./Search.module.css"

export default function Search ({handleSearch}) {
    const [value, setValue] = React.useState("")

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleClick = (e) => {
        setValue("")
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    React.useEffect(() => {
        handleSearch(value)
    }, [value, handleSearch])

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form} >
                <button type="button" className={styles.button}><BiSearch className={styles.iconSearch} size="1.2rem"/></button> 
                <label htmlFor="searchList">
                    <input id="searchList" type="text" placeholder="Search" value={value} onChange={handleChange} className={styles.input}/> 
                </label>
                 <button type="button" onClick={handleClick} className={styles.button}><TiDelete className={styles.iconDelete} size="1.2rem"/></button> 
            </form>
        </>
    )
}