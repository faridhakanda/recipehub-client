/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  
    images: {
        remotePatterns: [
            // {
            //     protocol: 'https',
            //     hostname: 'i.ibb.co.com',
            //     // port: '**',
            //     pathname: '/**'
            // },
            {
                protocol: 'https',
                hostname: '**',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                pathname: '/**'
            }
        ]
    }
  
  
};

export default nextConfig;
