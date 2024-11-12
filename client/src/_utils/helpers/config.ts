export const config = {
  api: {
    baseURL:
      process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3001/api",
  },
  mediaURL: process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:3001/images",
  stripeUrl: process.env.NEXT_PUBLIC_STRIPE_URL || "http://localhost:3002",
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "A",
  cryptoSecretKey: process.env.NEXT_CRYPTO_SECRET_KEY || "secret-key",
};
