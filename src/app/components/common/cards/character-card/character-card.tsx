"use client"

import { FC } from 'react';
import styles from './character-card.module.scss';

type CardProps = {
    image: string,
    name: string,
    gender: string | unknown | undefined
}
export const CharacterCard: FC<CardProps> = ({gender, image, name}) => {
    return (
        <article className={styles['card']}>
            <img className={styles['card-image']} src={image} alt={`${name} photo`} />
            <div className={styles['card-info']}>
                <h3 className={styles['card-name']}>{name}</h3>
                <p className={styles['card-gender']}>{typeof gender === "string" ? gender : 'unknown'}</p>
            </div>
        </article>
    )
}