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
            }
        ]
    }
  
  
};

export default nextConfig;
