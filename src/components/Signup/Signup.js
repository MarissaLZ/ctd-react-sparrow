import React from "react"
import {Link} from "react-router-dom"
import {requestAddAccount} from "../todoAPI.js"
import styles from "./Signup.module.css"
import Input from "../Input.js"

export default function Signup () {
    const [account, setAccount] = React.useState( { firstName:"", email:"", password:"" } )

    const handleSubmit = (e) => {
        e.preventDefault()
        requestAddAccount(account)
        .then((data)=> {
            setAccount(data)
        })
    }
    const handleChange = (e) => {
        setAccount(
            { ...account,
                [e.target.id]: e.target.value //dynamically access id of input and set it's value 
            }
        )
    } 
    return(
        <div className={styles.signupSubcontainer}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <Input id="firstName" type="text" value={account.username} handleChange={handleChange} className={styles.input} placeholder="First Name"/>
                <Input id="email" type="email" value={account.email} handleChange={handleChange} className={styles.input} placeholder="Email" />
                <Input id="password" type="text" value={account.password} handleChange={handleChange} className={styles.input} placeholder="Password"/>
                <button type="submit" className={styles.button}>Sign Up</button>
            </form>
           <span>Already have an account? <Link to="/" className={styles.link}>Login</Link></span>
            
        </div>
    )
}