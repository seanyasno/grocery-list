import React, { ChangeEvent, useCallback, useRef, useState } from 'react';

import { AiOutlineUnorderedList } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';
import { TiDelete } from 'react-icons/ti';

import { GroceryItemCard } from '@/features/grocery-item';
import { useBestGroceryPrice, useGroceryOptions } from '@/hooks';
import { theme } from '@/styles/theme';
import { Autocomplete, Box, Dialog, IconButton, Popper } from '@mui/material';
import { isEmpty } from 'lodash';
import { PropagateLoader, PuffLoader } from 'react-spinners';

import {
    ListIconWrapper,
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from './search-bar-styles';

type Props = {
    fullWidth?: boolean;
    showDelete?: boolean;
    onDelete?: () => void;
};

export const SearchBar: React.FC<Props> = (props) => {
    const { fullWidth = false, showDelete = false, onDelete } = props;
    const [groceryName, setGroceryName] = useState<string>('');
    const [selectedGrocery, setSelectedGrocery] = useState<any>(null);
    const searchFieldRef = useRef<HTMLDivElement>(null);

    const { data, isLoading: isLoadingOptions } =
        useGroceryOptions(groceryName);
    const { data: bestSelectedGrocery, isLoading: isLoadingBestGrocery } =
        useBestGroceryPrice(selectedGrocery?.id);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setGroceryName(event.target.value);
    }, []);

    return (
        <>
            <Search ref={searchFieldRef} fullWidth={fullWidth}>
                <SearchIconWrapper id={'search-icon'}>
                    {!isEmpty(groceryName) &&
                    isLoadingBestGrocery &&
                    !isLoadingOptions &&
                    !isEmpty(selectedGrocery) ? (
                        <PuffLoader
                            id={'search-icon-loader'}
                            color={theme.palette.primary.main}
                            size={18}
                        />
                    ) : (
                        <CiSearch
                            id={'search-icon-unique'}
                            color={theme.palette.primary.main}
                            size={20}
                        />
                    )}
                </SearchIconWrapper>
                <Autocomplete
                    fullWidth
                    noOptionsText={'לא נמצאו תוצאות'}
                    loading={isLoadingOptions && !isEmpty(groceryName)}
                    loadingText={
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                                marginBottom: '16px',
                            }}
                        >
                            <PropagateLoader
                                color={theme.palette.primary.main}
                                size={18}
                            />
                        </Box>
                    }
                    renderInput={(params) => (
                        <StyledInputBase
                            ref={params.InputProps.ref}
                            inputProps={params.inputProps}
                            placeholder="חפש מוצרים…"
                            onChange={handleChange}
                            value={groceryName}
                        />
                    )}
                    PopperComponent={(props) => (
                        <Popper
                            {...props}
                            style={{
                                width: searchFieldRef?.current?.offsetWidth,
                            }}
                            sx={{
                                right: `${
                                    showDelete ? '-14px' : '-24px'
                                } !important`,
                            }}
                            placeholder={'bottom-center'}
                        />
                    )}
                    options={data?.map((option) => option) || []}
                    getOptionLabel={(option: any) => option.name}
                    onChange={(event, value) => {
                        setSelectedGrocery(value);
                    }}
                />

                {showDelete ? (
                    <IconButton
                        onClick={() => {
                            onDelete?.();
                            setGroceryName('');
                        }}
                    >
                        <TiDelete
                            color={theme.palette.primary.main}
                            size={20}
                        />
                    </IconButton>
                ) : (
                    <ListIconWrapper onClick={() => alert('boo')}>
                        <AiOutlineUnorderedList
                            color={theme.palette.primary.main}
                            size={20}
                        />
                    </ListIconWrapper>
                )}
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
                    onAddToCart={() => setSelectedGrocery(null)}
                />
            </Dialog>
        </>
    );
};
