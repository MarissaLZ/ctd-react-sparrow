import React from "react"
import { Link } from "react-router-dom"
import { requestAddAccount } from "../todoAPI.js"
import styles from "./Signup.module.css"
import Input from "../Input.js"

export default function Signup() {
  const [account, setAccount] = React.useState({
    fields: {
      firstName: "",
      email: "",
      password: "",
    },
  })

  const [success, setSuccess] = React.useState(false)

  console.log("account", account)

  const handleSubmit = (e) => {
    e.preventDefault()
    requestAddAccount(account).then((data) => {
      console.log("data", data)
      setAccount({
        fields: {
          firstName: "",
          email: "",
          password: "",
        },
      })
      setSuccess(true)
    })
  }
  const handleChange = (e) => {
    return setAccount({
      ...account,
      fields: {
        ...account.fields,
        [e.target.id]: e.target.value,
      },
    })
  } //dynamically access id of input and set it's value
  //here were are replacing the given key: value pair. We are NOT mutating
  //we don't map since this is not an array

  return (
    <div className={styles.signupSubcontainer}>
      <h1>Sign Up</h1>
      {success && (
        <p className={styles.success}> Account Created. Please go to Login</p>
      )}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <Input
          id="firstName"
          type="text"
          value={account.fields.firstName}
          handleChange={handleChange}
          className={styles.input}
          placeholder="First Name"
        />
        <Input
          id="email"
          type="email"
          value={account.fields.email}
          handleChange={handleChange}
          className={styles.input}
          placeholder="Email"
        />
        <Input
          id="password"
          type="text"
          value={account.fields.password}
          handleChange={handleChange}
          className={styles.input}
          placeholder="Password"
        />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
      <span>
        Already have an account?{" "}
        <Link to="/" className={styles.link}>
          Login
        </Link>
      </span>
    </div>
  )
}
