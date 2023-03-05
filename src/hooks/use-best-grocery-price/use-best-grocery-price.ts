import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { isEmpty } from 'lodash';

export const useBestGroceryPrice = (id: string) => {
    return useQuery({
        queryKey: ['groceryPrices', id ?? ''],
        queryFn: async () => {
            try {
                const response = await axios.get(`/api/product/${id}/prices`);
                return response.data?.contents?.search_results?.[
                    response.data?.contents?.search_results.length - 1
                ];
            } catch (error) {
                console.error(error);
                return null;
            }
        },
        enabled: !isEmpty(id),
    });
};
