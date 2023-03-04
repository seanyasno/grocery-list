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

    try {
        const response = await chpInstance.get('/city_prices', {
            params: {
                code: pid,
                city: 'ראשון לציון',
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ error });
    }
}
