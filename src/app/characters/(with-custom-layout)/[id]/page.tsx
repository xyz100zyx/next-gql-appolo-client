'use client'

import { NextPage, NextPageContext } from "next";
import styles from './character-page.module.scss';
import { gql, useSuspenseQuery } from "@apollo/client";

const GET_CHARACTER_QUERY = gql`
query {
    character(id: 1){
      name,
      gender,
      image,
      status,
      species,
      origin{
        dimension
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

type CharacterByIdResponseType = {
    "character": {
        "name": string,
        "gender": string,
        "status": string,
        "species": string,
        image: string,
        "origin": {
            "dimension": string
        },
        "type": string,
        "episode": {
            "name": string,
            "air_date": string
        }[]
    }
}

const CharacterPage: NextPage = () => {

    const { data: CharacterResult, networkStatus: isCharacterLoading, error: CharacterResponseError } = useSuspenseQuery<CharacterByIdResponseType>(GET_CHARACTER_QUERY);

    console.log(CharacterResult);

    return (
        <div className={styles['page']}>
            <img className={styles['page-image']} alt={`image of character ${CharacterResult.character.name}`} src={CharacterResult.character.image} />
            <h4 className={styles['page-title']}>{CharacterResult.character.name}</h4>
        </div>
    )
};

export default CharacterPage;