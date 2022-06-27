import styles from "./Navigation.module.css"
import { AiOutlineUnorderedList } from "react-icons/ai";
 
export default function Navigation({requestNewList}) {

    const handleDefaultList = () => {
        const defaultList = "tblKkypMUe5OhJExQ"
        requestNewList(defaultList)
    }
    const handleWorkList = () => {
        const workList = "tblMLLVHFSNMoAqt9"
        requestNewList(workList)
    }
    const handlePersonalList = () => {
        const personalList = "tblVycmIwmsbV93p4"
        requestNewList(personalList)
    }

    return(
        <nav className={styles.nav}>
            <ul className={styles.container}>
                <li className={styles.item} onClick={handleDefaultList}>
                    <AiOutlineUnorderedList className={styles.icon} size="1rem"/><span>My Tasks</span>
                </li>
                <li className={styles.item} onClick={handleWorkList}>
                    <AiOutlineUnorderedList className={styles.icon} size="1rem"/><span>Work</span>
                </li>
                <li className={styles.item} onClick={handlePersonalList}>
                    <AiOutlineUnorderedList className={styles.icon} size="1rem"/><span>Personal</span>
                </li>
            </ul> 
        </nav>
    )
}

// {/* <Link to="/workList">Work</Link> */}
