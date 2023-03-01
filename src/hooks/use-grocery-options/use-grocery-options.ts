import { useDebounce } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { isEmpty } from 'lodash';

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
                        return {
                            id: item.code,
                            name: item.description
                                .split(',')
                                .slice(0, -1)
                                .join(','),
                            price: Number(item.price_range?.[0] ?? '0'),
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
