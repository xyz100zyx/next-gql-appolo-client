import { FC } from "react"
import logoBlack from '../../../../../public/logo-black.jpg';
import Image from "next/image";
import styles from './logo-icon.module.scss';

export const LogoIcon:FC = () => {
    return (
        <Image className={styles.logo} src={logoBlack} alt="Logo Rick & Morty" />
    )
}