import styles from "./Navigation.module.css"
import { VscCircleFilled } from "react-icons/vsc"
import PropTypes from "prop-types"

export default function Navigation({ requestNewList, openNav, toggleNavbar }) {
  const handleDefaultList = () => {
    const todayList = "Today"
    requestNewList(todayList)
  }
  const handleWorkList = () => {
    const workList = "Work"
    requestNewList(workList)
  }
  const handlePersonalList = () => {
    const personalList = "Personal"
    requestNewList(personalList)
  }

  return (
    <nav className={openNav ? styles.showNav : styles.hideNav}>
      <ul className={styles.container}>
        <li className={styles.item} onClick={handleDefaultList}>
          <VscCircleFilled className={styles.icon} size="1.2rem" />
          <span>Today</span>
        </li>
        <li className={styles.item} onClick={handleWorkList}>
          <VscCircleFilled className={styles.icon} size="1.2rem" />
          <span>Work</span>
        </li>
        <li className={styles.item} onClick={handlePersonalList}>
          <VscCircleFilled className={styles.icon} size="1.2rem" />
          <span>Personal</span>
        </li>
      </ul>
    </nav>
  )
}

Navigation.propTypes = {
  requestNewList: PropTypes.func,
  openNav: PropTypes.bool,
  toggleNavbar: PropTypes.func,
}

// {/* <Link to="/workList">Work</Link> */}
