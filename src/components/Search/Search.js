import React from "react"
import { IoIosSearch } from "react-icons/io";
import styles from "./Search.module.css"

export default function Search ( {handleSearch}) {
    const [search, setSearch ] = React.useState("")

    console.log("search",search)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const handleSubmit = (e) => {
        //send data back up???
        e.preventDefault()
        handleSearch(search)
        // setSearch("")
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="searchList">
                <input id="searchList" type="text" placeholder="search" value={search} onChange={handleChange}/> 
                </label>
            <button><IoIosSearch className={styles.icon}/></button>
            </form>
        </>
    )
}