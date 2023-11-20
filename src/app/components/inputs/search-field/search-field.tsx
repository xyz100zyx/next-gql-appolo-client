import { FC } from 'react';
import { TextField } from '..';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from '../../common/search-icon';

type SearchFieldProps = {
    param: string
}

export const SearchField: FC<SearchFieldProps> = ({ param }) => {

    const params = useSearchParams();
    const isExistsThisParam = params.get(param);
    const pathname = usePathname();
    const { replace } = useRouter()
    const searchParams = new URLSearchParams();
    searchParams.set("page", params.get("page")!)
    const baseUrl = `${pathname}?`;
    const onSearchInputChange = (value: string) => {

        if(!value){
            searchParams.delete(param)
        }else{
            searchParams.set(param, value)
        }
        replace(`${baseUrl}${searchParams.toString()}`)
    }

    return <TextField value={params.get(param) || ""} icon={<SearchIcon />} placeholder='Filter by name...' name={'name'} onChange={onSearchInputChange} />
}