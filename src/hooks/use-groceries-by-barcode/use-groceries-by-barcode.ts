import { useDebounce } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { isEmpty } from 'lodash';

export const useGroceryByBarcode = (barcodes: string[]) => {
    return useQuery({
        queryKey: ['groceriesByBarcodes', barcodes ?? []],
        queryFn: async () => {
            try {
                const requests = barcodes.map((barcode) => {
                    const splitBarcode = barcode.split('_');
                    return axios.get(
                        `/api/product/${splitBarcode[splitBarcode.length - 1]}`
                    );
                });

                const responses = await Promise.all(requests);

                return responses.map((response) => {
                    if (response.data?.contents?.search_results?.length > 0) {
                        const item = response.data.contents.search_results[0];
                        return {
                            id: item.code,
                            name: item.description
                                .split(',')
                                .slice(0, -1)
                                .join(','),
                            price: Number(item.price_range?.[0] ?? '0'),
                        };
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        enabled: !isEmpty(barcodes),
    });
};
