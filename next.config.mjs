/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, //엄격 모드 false
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 eslint 오류 무시
  },
};
export default nextConfig;
