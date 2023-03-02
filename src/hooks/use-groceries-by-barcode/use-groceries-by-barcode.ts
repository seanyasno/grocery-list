import { fetchGroceriesByBarcodes } from '@/requests';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';

export const useGroceryByBarcode = (barcodes: string[]) => {
    return useQuery({
        queryKey: ['groceriesByBarcodes', barcodes ?? []],
        queryFn: async () => fetchGroceriesByBarcodes(barcodes),
        enabled: !isEmpty(barcodes),
    });
};
