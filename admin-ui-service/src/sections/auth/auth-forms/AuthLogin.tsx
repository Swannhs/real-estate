import { Button, Grid, Link } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
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
  const { login } = useAuth();
  const scriptedRef = useScriptRef();

  return (
    <>
      <Formik
        initialValues={{
          email: 'info@phoenixcoded.co',
          password: '123456',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await login(values.email, values.password);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err: any) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
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
      </Formik>
    </>
  );
};

export default AuthLogin;
