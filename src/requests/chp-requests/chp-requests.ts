import { chpInstance } from '@/utils/axios/axios';

export const fetchGrocery = async (pid: string) =>
    chpInstance.get('/product', {
        params: {
            product: pid,
            city: 'ראשון לציון',
        },
    });
