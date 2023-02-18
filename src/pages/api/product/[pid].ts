import type { NextApiRequest, NextApiResponse } from 'next';

import { chpInstance } from '@/utils/axios/axios';

type Data = {
    name?: string;
    error?: unknown;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { pid } = req.query;

    console.log('products pid', pid);

    try {
        const response = await chpInstance.get('/product', {
            params: {
                product: pid,
            },
        });

        console.log('products response', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ error });
    }
}
