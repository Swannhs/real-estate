import { Button, Grid, Link } from '@mui/material';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';

// ============================|| JWT - LOGIN ||============================ //

const KEYCLOAK_AUTH_URL =
  process.env.REACT_APP_KEYCLOAK_URL +
  '/realms/' +
  process.env.REACT_APP_KEYCLOAK_REALM +
  '/protocol/openid-connect/auth' +
  '?client_id=' +
  process.env.REACT_APP_KEYCLOAK_CLIENT_ID +
  '&redirect_uri=' +
  process.env.REACT_APP_KEYCLOAK_REDIRECT_URI +
  '&response_type=code&scope=openid';

const AuthLogin = () => {

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Link href={KEYCLOAK_AUTH_URL}>
          <AnimateButton>
            <Button disableElevation fullWidth size="large" type="button" variant="contained" color="primary">
              Login With Keycloak
            </Button>
          </AnimateButton>
        </Link>
      </Grid>
    </Grid>
  );
};

export default AuthLogin;
