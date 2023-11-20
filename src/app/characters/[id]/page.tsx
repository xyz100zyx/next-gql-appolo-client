'use client'

import { NextPage } from "next";
import styles from './character-page.module.scss';
import { gql, useSuspenseQuery } from "@apollo/client";
import { usePathname } from "next/navigation";

type CharacterByIdResponseType = {
    "character": {
        "name": string,
        "gender": string,
        "status": string,
        "species": string,
        image: string,
        "origin": {
            "dimension": string,
            name: string
        },
        "type": string,
        "episode": {
            "name": string,
            "air_date": string
        }[]
    }
}

const CharacterPage: NextPage = () => {

    const pathname = usePathname();
    const id = pathname.split("/").slice(-1).join("")


    const GET_CHARACTER_QUERY = gql`
query {
    character(id: ${id}){
      name,
      gender,
      image,
      status,
      species,
      origin{
        dimension,
        name
      },
      type,
      episode{
        name
        air_date
        episode
      }
    }
  }
`

    const { data: CharacterResult, networkStatus: isCharacterLoading, error: CharacterResponseError } = useSuspenseQuery<CharacterByIdResponseType>(GET_CHARACTER_QUERY);

    const { episode, gender, image, name, origin, species, status, type } = CharacterResult.character;

    return (
        <div className={styles['page']}>
            <img className={styles['page-image']} alt={`image of character ${CharacterResult.character.name}`} src={image} />
            <h4 className={styles['page-title']}>{name}</h4>
            <section className={styles['page-blocks']}>
                <div className={styles['block']}>
                    <p className={styles['block-title']}>Informations</p>
                    <ul className={styles['block-list']}>
                        <li className={styles['item']}>
                            <p className={styles['item-title']}>Gender</p>
                            <div className={styles['item-inner']}>
                                <p className={styles['custom-p']}>
                                    {gender}
                                </p>
                            </div>
                        </li>
                        <li className={styles['item']}>
                            <p className={styles['item-title']}>Status</p>
                            <div className={styles['item-inner']}>
                                <p className={styles['custom-p']}>
                                    {status}
                                </p>
                            </div>
                        </li>
                        <li className={styles['item']}>
                            <p className={styles['item-title']}>Specie</p>
                            <div className={styles['item-inner']}>
                                <p className={styles['custom-p']}>
                                    {species}
                                </p>
                            </div>
                        </li>
                        <li className={styles['item']}>
                            <p className={styles['item-title']}>Origin</p>
                            <div className={styles['item-inner']}>
                                <p className={styles['custom-p']}>
                                    {origin.name}
                                </p>
                            </div>
                        </li>
                        <li className={styles['item']}>
                            <p className={styles['item-title']}>Type</p>
                            <div className={styles['item-inner']}>
                                <p className={styles['custom-p']}>
                                    {!!type.length ? type : 'Unknown'}
                                </p>
                            </div>
                        </li>
                        <li className={styles['item']}>
                            <p className={styles['item-title']}>Location</p>
                            <div className={styles['item-inner']}>
                                <p className={styles['custom-p']}>
                                    {origin.dimension}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )
};

export default CharacterPage;