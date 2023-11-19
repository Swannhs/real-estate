// import useAuth from 'hooks/useAuth';
import AuthWrapper from 'sections/auth/AuthWrapper';
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import keycloakAxios from "../../utils/keycloakAxios";

// ================================|| LOGIN ||================================ //

const RedirectAfterLogin = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const getAccessTokenFromKeycloak = () => {
    let code = queryParams.get('code');
    if (code) {
      const params = new URLSearchParams();
      params.append('code', code as string);
      params.append('grant_type', 'authorization_code');
      params.append('client_id', process.env.REACT_APP_KEYCLOAK_CLIENT_ID as string);
      params.append('redirect_uri', process.env.REACT_APP_KEYCLOAK_REDIRECT_URI as string);
      params.append('client_secret', process.env.REACT_APP_KEYCLOAK_CLIENT_SECRET as string);
      keycloakAxios.post(`/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect/token`, params)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        });
    }
  }

  // const { isLoggedIn } = useAuth();
  useEffect(() => {
    getAccessTokenFromKeycloak();
  }, []);

  return (
    <AuthWrapper>
      <Typography variant='h3' sx={{ mb: 1.5 }}>
        Redirecting...
      </Typography>
    </AuthWrapper>
  );
};

export default RedirectAfterLogin;
