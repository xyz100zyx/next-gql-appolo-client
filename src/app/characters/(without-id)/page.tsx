'use client'

export const dynamic = 'force-dynamic'

import { NetworkStatus, gql, useQuery, useSuspenseQuery } from '@apollo/client';
import { CharacterCard, TextField } from '../../components';
import styles from './characters-page.module.scss';
import { FC, useCallback, useState } from 'react';
import { SearchIcon } from '../../components/common/search-icon';
import { ResponseAllCharactersType } from '../../utils';
import { useRouter } from 'next/navigation';

interface IFormFields { name: string, species: string, gender: string, status: string };
const initialFormValues: IFormFields = {
  gender: '',
  name: '',
  species: '',
  status: ''
}

const GET_CHARACTERS = gql`
query {
  characters(page: 1) {
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

const CharactersPage: FC = () => {

  const navigate = useRouter()

  const [formValues, setFormValues] = useState<{ name: string, species: string, gender: string, status: string }>(initialFormValues);
  const onNameFieldChange = useCallback((value: string) => setFormValues(prev => ({ ...prev, name: value })), []);
  const { data: charactersResult, networkStatus: isCharactersLoading, error: charactersResponseError } = useSuspenseQuery<ResponseAllCharactersType>(GET_CHARACTERS);
  const onCardClick = (id: string) => () => {
    navigate.push('/characters/'+id)
  }

  return (
    <div className={styles.page}>
      <form
        className={styles['form']}
      >
        <div className={styles['form-input']}>
          <TextField icon={<SearchIcon />} placeholder='Filter by name...' name={'name'} onChange={onNameFieldChange} value={formValues.name} />
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
    </div>
  )
};



export default CharactersPage;