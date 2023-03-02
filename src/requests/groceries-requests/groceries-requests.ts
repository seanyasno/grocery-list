import { Grocery } from '@/abstraction';
import { groceryRequestFormatter } from '@/utils';
import axios from 'axios';

export const fetchGroceriesByBarcodes = async (
    barcodes: string[]
): Promise<Grocery[]> => {
    try {
        const requests = barcodes.map((barcode) => {
            const splitBarcode = barcode.split('_');
            return axios.get(
                `/api/product/${splitBarcode[splitBarcode.length - 1]}`
            );
        });

        const responses = await Promise.all(requests);

        return responses.map((response) =>
            groceryRequestFormatter(response.data)
        );
    } catch (error) {
        console.log(error);
        return [];
    }
};
