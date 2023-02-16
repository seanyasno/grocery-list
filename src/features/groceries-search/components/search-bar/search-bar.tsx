import React, { ChangeEvent, useCallback, useState } from 'react';

import { AiOutlineUnorderedList } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';

import { GroceryItemCard } from '@/features/grocery-item';
import { useBestGroceryPrice, useGroceryOptions } from '@/hooks';
import { theme } from '@/styles/theme';
import { Autocomplete, Dialog } from '@mui/material';
import { isEmpty } from 'lodash';

import {
    ListIconWrapper,
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from './search-bar-styles';

export const SearchBar: React.FC = () => {
    const [groceryName, setGroceryName] = useState<string>('');
    const [selectedGrocery, setSelectedGrocery] = useState<any>(null);

    const { data } = useGroceryOptions(groceryName);
    const { data: bestSelectedGrocery } = useBestGroceryPrice(
        selectedGrocery?.id
    );

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setGroceryName(event.target.value);
    }, []);

    return (
        <>
            <Search>
                <SearchIconWrapper>
                    <CiSearch color={theme.palette.primary.main} size={20} />
                </SearchIconWrapper>
                <Autocomplete
                    fullWidth
                    noOptionsText={'לא נמצאו תוצאות'}
                    renderInput={(params) => (
                        <StyledInputBase
                            ref={params.InputProps.ref}
                            inputProps={params.inputProps}
                            placeholder="חפש מוצרים…"
                            onChange={handleChange}
                            value={groceryName}
                        />
                    )}
                    options={data?.map((option) => option) || []}
                    getOptionLabel={(option: any) => option.name}
                    onChange={(event, value) => {
                        setSelectedGrocery(value);
                    }}
                />

                <ListIconWrapper>
                    <AiOutlineUnorderedList
                        color={theme.palette.primary.main}
                        size={20}
                    />
                </ListIconWrapper>
            </Search>

            <Dialog
                open={!isEmpty(bestSelectedGrocery)}
                onClose={() => setSelectedGrocery(null)}
                PaperProps={{
                    style: {
                        borderRadius: '16px',
                    },
                }}
            >
                <GroceryItemCard
                    grocery={{
                        id: selectedGrocery?.id,
                        name: selectedGrocery?.name,
                        price: Number(bestSelectedGrocery?.PRICE ?? '0'),
                    }}
                />
            </Dialog>
        </>
    );
};
