/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_CHP_USERNAME: process.env.NEXT_PUBLIC_CHP_USERNAME,
        NEXT_PUBLIC_CHP_PASSWORD: process.env.NEXT_PUBLIC_CHP_PASSWORD,
    },
};

module.exports = nextConfig;
