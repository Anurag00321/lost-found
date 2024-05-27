/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: [
      "images.pexels.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "images.unsplash.com"
    ],
    
  },
  
};
module.exports = {
  env: {
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  },
};


export default nextConfig;
