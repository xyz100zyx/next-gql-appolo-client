import Image from 'next/image';
import { LayoutWithProps } from '../../utils/types/routing';
import styles from './characters-layout.module.scss';
import charactersLayoutTextImage from '../../../public/characters-layout-text.jpg';

const CharactersLayout = ({children}: LayoutWithProps) => {
    return (
        <div className={styles.layout}>
            <Image src={charactersLayoutTextImage} alt={"Rick And Morty text preview"} className={styles['layout-img']} />
            <main className={styles['layout-children']}>
                {children}
            </main>
        </div>
    )
};

export default CharactersLayout;