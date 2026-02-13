import styles from "./Goodreads.module.css";

export default function Goodreads() {
    return (
        <div id={styles.gr_updates_widget}>
            <iframe
                id={styles.the_iframe}
                src="https://goodreads.com/widgets/user_update_widget?height=400&num_updates=2&user=160160842&width=280"
                frameBorder="0"
            >
            </iframe>
        </div>
    )
}
