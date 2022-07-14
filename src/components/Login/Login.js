import React from "react"
import Input from "../Input.js"
import { Navigate, Link } from "react-router-dom"
import styles from "./Login.module.css"

export default function Login({ handleUser }) {
  const [login, setLogin] = React.useState({
    firstName: "",
    email: "",
    password: "",
  })
  const [authenticate, setAuthenticate] = React.useState(false)
  const [notFound, setNotFound] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tbl304DDbP24rw3sE?fields%5B%5D=email&fields%5B%5D=password&view=Grid+view`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data.records.map((account) => {
          if (
            account.fields.email === login.email &&
            account.fields.password === login.password
          ) {
            setAuthenticate((a) => !a)
            handleUser(account)
          } else {
            setNotFound(true)
          }
        })
      })
      .catch((error) => console.log("error", error))
  }

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.id]: e.target.value, //dynamically access id of input and set it's value
    })
  }

  if (authenticate) {
    return <Navigate to="/home" />
  }
  return (
    <div className={styles.loginSubcontainer}>
      <h1 className={styles.header}>Login</h1>
      {notFound && <p className={styles.failure}> Invalid Login</p>}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <Input
          id="email"
          type="email"
          value={login.username}
          handleChange={handleChange}
          className={styles.input}
          placeholder="Email"
        />
        <Input
          id="password"
          type="text"
          value={login.password}
          handleChange={handleChange}
          className={styles.input}
          placeholder="Password"
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <span>
        Don't have an account?{" "}
        <Link to="/signup" className={styles.link}>
          Sign up
        </Link>
      </span>
    </div>
  )
}
/*if there are no accounts in airtable the invalid message 
does not show since there is nothing to compare*/
