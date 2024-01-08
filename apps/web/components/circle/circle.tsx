
import Image from 'next/image'
import styles from "../../app/page.module.css";



export default function ImageComponent({ name, image }) {

    return (
        <div className={styles.logo}>
            <Image
                alt={name}
                className={styles.avatarRound}
                priority
                src={image}
                height={120}
                width={120}
                style={{ pointerEvents: "none" }}
            />
        </div>
    )
}
