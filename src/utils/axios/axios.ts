import axios from 'axios';

export const chpInstance = axios.create({
    baseURL: 'http://api-2.chp.co.il/api/',
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Credentials': true,
    },
});

let token = '1677967426854604496';

chpInstance.interceptors.request.use(async (config) => {
    console.log('token', token);
    config.params = { ...config.params, token };
    return config;
});

chpInstance.interceptors.response.use(
    async (response) => {
        if (
            response.data?.status === -1 &&
            (response.data?.contents === 'login required' ||
                response.data?.contents === 'token expired')
        ) {
            try {
                console.log('here', response.data);
                const tokenResponse = await axios.get(
                    'http://api-2.chp.co.il/api/login',
                    {
                        params: {
                            u_n: process.env.NEXT_PUBLIC_CHP_USERNAME,
                            p_s: process.env.NEXT_PUBLIC_CHP_PASSWORD,
                        },
                    }
                );
                token = tokenResponse.data.contents.token;
                response.config.params.token =
                    tokenResponse.data.contents.token;
                return chpInstance(response.config);
            } catch (error) {
                console.log(error);
            }
        }

        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
);
