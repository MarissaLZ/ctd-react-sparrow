import styles from "./Header.module.css"
import React from "react"
import { AiOutlineMenu } from "react-icons/ai"
import PropTypes from "prop-types"

export function Header({ toggleNavbar }) {
  return (
    <header className={styles.header}>
      <button className={styles.button} onClick={toggleNavbar}>
        <AiOutlineMenu className={styles.icon} size="1.3rem" />
      </button>
    </header>
  )
}
Header.propTypes = {
  toggleNavbar: PropTypes.func,
}
