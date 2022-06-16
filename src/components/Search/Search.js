import React from "react"
import { IoIosSearch} from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import styles from "./Search.module.css"


export default function Search ({handleSearch}) {
    const [value, setValue] = React.useState("")

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleClick = (e) => {
        setValue("")
    }

    React.useEffect(() => {
        handleSearch(value)
    }, [value,handleSearch])

    return (
        <>
            <form>
                <label htmlFor="searchList">
                <input id="searchList" type="text" placeholder="search" value={value} onChange={handleChange} className={styles.input}/> 
                </label>
            <button type="button"><TiDelete className={styles.iconClear} onClick={handleClick}/></button> 
            {/* <button type="button"><IoIosSearch className={styles.iconSearch}/></button> */}
            </form>
        </>
    )
}