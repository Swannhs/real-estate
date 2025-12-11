// Environment variables are preferred, but we can set defaults here.
export const API_CONFIG = {
  ESTATE_SERVICE_URL: process.env.NEXT_PUBLIC_ESTATE_SERVICE_URL || 'http://localhost:8182',
  USER_SERVICE_URL: process.env.NEXT_PUBLIC_USER_SERVICE_URL || 'http://localhost:8183',
  EMAIL_SERVICE_URL: process.env.NEXT_PUBLIC_EMAIL_SERVICE_URL || 'http://localhost:8184',
  STATIC_SERVICE_URL: process.env.NEXT_PUBLIC_STATIC_SERVICE_URL || 'http://localhost:8181',
  BOOKING_SERVICE_URL: process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL || 'http://localhost:8185',
};
