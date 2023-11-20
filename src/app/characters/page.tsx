'use client'

export const dynamic = 'force-dynamic'

import { gql, useSuspenseQuery } from '@apollo/client';
import { CharacterCard } from '../components';
import styles from './characters-page.module.scss';
import { FC } from 'react';
import { ResponseAllCharactersType } from '../utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchField } from '../components/inputs';

interface IFormFields { name: string, species: string, gender: string, status: string };


const CharactersPage: FC = () => {

  const { replace } = useRouter();
  const pathname = usePathname()
  const navigate = useRouter()
  const { get, set, has, size } = useSearchParams();
  const searchParams = new URLSearchParams();

  if (!has('page') && size === 0) {
    searchParams.append("page", "1");
    replace(`${pathname}?page=${searchParams.get("page")}`)
  }

  const onClickLoadMoreButton = () => {
    searchParams.set("page", `${+get("page")!+1}`);
    replace(`${pathname}?page=${searchParams.get("page")}`)
  }

  const GET_CHARACTERS = gql`
query {
  characters(page: ${get("page")}, filter: {name: "${get('name') || ""}"}) {
    info {
      count
    }
    results {
      name
      id
      gender
      image
    }
  }
}
    `

  const { data: charactersResult, networkStatus: isCharactersLoading, error: charactersResponseError } = useSuspenseQuery<ResponseAllCharactersType>(GET_CHARACTERS);
  const onCardClick = (id: string) => () => {
    navigate.push('/characters/' + id);
    window.scrollTo({top: 0})
  }

  return (
    <div className={styles.page}>
      <form
        className={styles['form']}
      >
        <div className={styles['form-input']}>
          <SearchField param='name' />
        </div>
        {/*<div className={styles['form-input']}>
                    <TextField name={'name'} onChange={onNameFieldChange} value={formValues.name} />
                </div>
                <div className={styles['form-input']}>
                    <TextField name={'name'} onChange={onNameFieldChange} value={formValues.name} />
                </div>
                <div className={styles['form-input']}>
                    <TextField name={'name'} onChange={onNameFieldChange} value={formValues.name} />
    </div>*/}
      </form>
      <ul className={styles['page-cards']}>
        {(charactersResult.characters.results || []).map(character => (
          <li onClick={onCardClick(character.id)} key={character.id} className={styles['page-card']}>
            <CharacterCard {...character} />
          </li>
        ))}
      </ul>
      <button onClick={onClickLoadMoreButton} className={styles['page-load']}>Load more</button>
    </div>
  )
};



export default CharactersPage;