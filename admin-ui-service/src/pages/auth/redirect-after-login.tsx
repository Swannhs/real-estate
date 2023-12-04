// import useAuth from 'hooks/useAuth';
import AuthWrapper from 'sections/auth/AuthWrapper';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// ================================|| LOGIN ||================================ //

const RedirectAfterLogin = () => {
  const { login, isLoggedIn } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const getAccessTokenFromKeycloak = () => {
    let code = queryParams.get('code');
    if (code) {
      login(code as string)
    } else {
      window.location.href = '/login';
    }
  };

  // const { isLoggedIn } = useAuth();
  useEffect(() => {
    getAccessTokenFromKeycloak();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/dashboard/default';
    }
  }, [isLoggedIn]);

  return (
    <AuthWrapper>
      <Typography variant="h3" sx={{ mb: 1.5 }}>
        Redirecting...
      </Typography>
    </AuthWrapper>
  );
};

export default RedirectAfterLogin;
