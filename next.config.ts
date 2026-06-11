import type { NextConfig } from "next";

// Environment validation on startup
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'development') {
  // Skip during build if needed, but we typically want it everywhere.
}
if (!process.env.GEMINI_API_KEY) {
  throw new Error("FATAL: GEMINI_API_KEY is missing. The application cannot start without AI configuration.");
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
