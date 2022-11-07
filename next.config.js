/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
    // 因为node_modules/@ethersproject/contracts/src.ts/index.ts:143:5 中有类型错误，所以打包的时候跳过类型检查
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
