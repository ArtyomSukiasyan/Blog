import styles from "./Goodreads.module.css";

export default function Goodreads() {
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>
                <a
                    href="https://www.goodreads.com/review/list/160160842-artyom-sukiasyan?shelf=currently-reading&utm_medium=api&utm_source=custom_widget"
                    rel="nofollow"
                    style={{ textDecoration: "none" }}
                    target="_blank"
                >
                    Currently reading
                </a>
            </h2>

            {/* Book 1 */}
            <div className={styles.eachBook}>
                <div className={styles.bookCover}>
                    <a
                        href="https://www.goodreads.com/review/show/7470374221?utm_medium=api&utm_source=custom_widget"
                        rel="nofollow"
                        target="_blank"
                    >
                        <img
                            src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1530173341l/40660726._SX50_.jpg"
                            alt="Чистая архитектура. Искусство разработки программного обеспечения"
                        />
                    </a>
                </div>
                <div className={styles.title}>
                    <a
                        href="https://www.goodreads.com/review/show/7470374221?utm_medium=api&utm_source=custom_widget"
                        rel="nofollow"
                        target="_blank"
                    >
                        Чистая архитектура. Искусство разработки программного обеспечения
                    </a>
                </div>
                <div className={styles.author}>
                    by{" "}
                    <a
                        href="https://www.goodreads.com/author/show/45372.Robert_C_Martin"
                        rel="nofollow"
                        target="_blank"
                    >
                        Robert C. Martin
                    </a>
                </div>
            </div>

            {/* Book 2 */}
            <div className={styles.eachBook}>
                <div className={styles.bookCover}>
                    <a
                        href="https://www.goodreads.com/review/show/7470373558?utm_medium=api&utm_source=custom_widget"
                        rel="nofollow"
                        target="_blank"
                    >
                        <img
                            src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1467271003l/30815916._SY75_.jpg"
                            alt="Mein Kampf"
                        />
                    </a>
                </div>
                <div className={styles.title}>
                    <a
                        href="https://www.goodreads.com/review/show/7470373558?utm_medium=api&utm_source=custom_widget"
                        rel="nofollow"
                        target="_blank"
                    >
                        Mein Kampf
                    </a>
                </div>
                <div className={styles.author}>
                    by{" "}
                    <a
                        href="https://www.goodreads.com/author/show/15419225.H_Adolf"
                        rel="nofollow"
                        target="_blank"
                    >
                        H. Adolf
                    </a>
                </div>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                <a href="https://www.goodreads.com/" rel="nofollow" target="_blank">
                    <img
                        src="https://s.gr-assets.com/images/widget/widget_logo.gif"
                        alt="goodreads.com"
                        style={{ border: 0 }}
                    />
                </a>
            </div>
        </div>
    );
}
