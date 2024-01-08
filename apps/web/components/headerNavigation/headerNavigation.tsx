
import Image from 'next/image'
import styles from "../../app/page.module.css";
import Link from 'next/link';

export default function headerNavigation() {
    return (
        <header>
            <nav>
                <Link href="#">Manuel<span style={{ fontSize: 15 }}>.team</span></Link>
                <Link href="#">
                    <svg
                        className={styles.homeIcon}
                        viewBox="0 0 24 24"
                        width={20}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 2L1 12h3v10h6v-7h4v7h6V12h3L12 2z"
                            fill="currentColor"
                        />
                    </svg>
                </Link>
                <Link href="#">About</Link>
                <Link href="#">Profile</Link>
                <Link href="/skills">Skills</Link>
                <Link href="#">Skills</Link>

            </nav>
        </header>
    )
}
