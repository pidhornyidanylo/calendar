/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com", "avataaars.io", "plus.unsplash.com"],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
};

export default nextConfig;