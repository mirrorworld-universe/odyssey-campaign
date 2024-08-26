/** @type {import('next').NextConfig} */
// import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// export default (phase) => {
//   const isDev = phase === PHASE_DEVELOPMENT_SERVER;
//   /**
//    * @type {import('next').NextConfig}
//    */
//   const nextConfig = {
//     assetPrefix: isDev ? undefined : "https://odyssey-staging.sonic.game",
//   };
//   return nextConfig;
// };

const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
