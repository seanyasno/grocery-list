import React, { ChangeEvent, useCallback, useState } from 'react';

import { AiOutlineUnorderedList } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';

import { useDebounce } from '@/hooks';
import { theme } from '@/styles/theme';
import { Autocomplete } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { isEmpty } from 'lodash';

import {
    ListIconWrapper,
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from './search-bar-styles';

export const SearchBar: React.FC = () => {
    const [groceryName, setGroceryName] = useState<string>('');
    const debouncedGroceryName = useDebounce(groceryName, 500);
    const [options, setOptions] = useState<string[]>([]);

    const {} = useQuery({
        queryKey: ['groceryOptions', debouncedGroceryName],
        queryFn: () => axios.get(`/api/product/${debouncedGroceryName}`),
        onSuccess: ({ data }) => {
            if (data?.contents?.search_results?.length > 0) {
                setOptions(
                    data.contents.search_results.map((item) =>
                        item.description.split(',').slice(0, -1).join(',')
                    )
                );
            } else {
                setOptions([]);
            }
        },
        enabled: !isEmpty(debouncedGroceryName),
    });

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setGroceryName(event.target.value);
    }, []);

    return (
        <Search>
            <SearchIconWrapper>
                <CiSearch color={theme.palette.primary.main} size={20} />
            </SearchIconWrapper>
            <Autocomplete
                freeSolo
                fullWidth
                renderInput={(params) => (
                    <StyledInputBase
                        ref={params.InputProps.ref}
                        inputProps={params.inputProps}
                        placeholder="חפש מוצרים…"
                        onChange={handleChange}
                        value={groceryName}
                    />
                )}
                options={options}
            />

            <ListIconWrapper>
                <AiOutlineUnorderedList
                    color={theme.palette.primary.main}
                    size={20}
                />
            </ListIconWrapper>
        </Search>
    );
};
