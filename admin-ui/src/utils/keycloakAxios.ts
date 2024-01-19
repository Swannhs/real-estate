import axios from 'axios';

export const keycloakAxios = axios.create();

// Set keycloak url
keycloakAxios.defaults.baseURL = process.env.REACT_APP_KEYCLOAK_URL;

keycloakAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('keycloakToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

keycloakAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('keycloakToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default keycloakAxios;
