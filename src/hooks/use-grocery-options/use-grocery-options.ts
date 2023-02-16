import { useDebounce } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { isEmpty } from 'lodash';

type GroceryOption = {
    id: string;
    name: string;
    barcode: string;
    manufacture: string;
};

export const useGroceryOptions = (groceryName: string) => {
    const debouncedGroceryName = useDebounce(groceryName, 500);

    return useQuery({
        queryKey: ['groceryOptions', debouncedGroceryName ?? ''],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `/api/product/${debouncedGroceryName}`
                );
                if (response.data?.contents?.search_results?.length > 0) {
                    return response.data.contents.search_results.map((item) => {
                        // const splitItem = item.description.split(',');
                        // return <GroceryOption>{
                        //     barcode: splitItem.splice(-1),
                        //     name: splitItem.splice(-1)?.[0].replace(/יצרן\/מותג:/g, ''),
                        //     id: item.code,
                        //     manufacture: splitItem[1],
                        // };

                        return {
                            id: item.code,
                            name: item.description
                                .split(',')
                                .slice(0, -1)
                                .join(','),
                        };
                    });
                }

                return [];
            } catch (error) {
                console.log(error);
            }
        },
        enabled: !isEmpty(debouncedGroceryName),
    });
};
