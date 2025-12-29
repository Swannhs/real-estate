// Environment variables are preferred, but we can set defaults here.
export const API_CONFIG = {
  ESTATE_SERVICE_URL: process.env.REACT_APP_ESTATE_SERVICE_URL || 'http://localhost:8182',
  USER_SERVICE_URL: process.env.REACT_APP_USER_SERVICE_URL || 'http://localhost:8183',
  EMAIL_SERVICE_URL: process.env.REACT_APP_EMAIL_SERVICE_URL || 'http://localhost:8184',
  STATIC_SERVICE_URL: process.env.REACT_APP_STATIC_SERVICE_URL || 'http://localhost:8181',
  BOOKING_SERVICE_URL: process.env.REACT_APP_BOOKING_SERVICE_URL || 'http://localhost:8185',
};
