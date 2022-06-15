import React from "react"
import { IoIosSearch } from "react-icons/io";
import styles from "./Search.module.css"


export default function Search ({handleSearch}) {
    const [value, setValue] = React.useState("")

    const handleChange = (e) => {
        setValue(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        handleSearch(value)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="searchList">
                <input id="searchList" type="text" placeholder="search" value={value} onChange={handleChange}/> 
                </label>
            <button><IoIosSearch className={styles.icon}/></button>
            </form>
        </>
    )
}