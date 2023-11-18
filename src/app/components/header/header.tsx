import { FC } from "react";
import styles from './header.module.scss';
import { LogoIcon } from "../common/logo-icon/logo-icon";
import Link from "next/link";
import { MockNavigationItemsType } from "@/app/utils";

const MockNavigationItems: MockNavigationItemsType[] = [
    {
        id: 'characters',
        title: 'Characters',
        path: '/characters',
    },
    {
        id: 'locations',
        title: 'Locations',
        path: '/locations',
    },
    {
        id: 'episodes',
        title: 'Episodes',
        path: '/episodes',
    }
]

export const Header: FC = () => {

    return (
        <header className={styles.header}>
            <div className={styles['header-container']}>
                <Link href={'/'}  className={styles['header-logo']}>
                    <LogoIcon />
                </Link>
                <nav className={styles['header-nav']}>
                    {MockNavigationItems.map(item => (
                        <Link className={styles['nav-item']} key={item.id} href={item.path}>{item.title}</Link>
                    ))}
                </nav>
            </div>
        </header>
    )
};