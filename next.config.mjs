/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["t.me", "*.streamlit.app", "github.com"],
  },
  output: process.env.NEXT_OUTPUT_MODE === "export" ? "export" : undefined,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
