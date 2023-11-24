import { Link } from 'react-router-dom';
import { To } from 'history';

// material-ui
import { Box, ButtonBase, Typography } from '@mui/material';
import { SxProps } from '@mui/system';

// project-imports
import { APP_DEFAULT_PATH } from 'config';

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  reverse?: boolean;
  isIcon?: boolean;
  sx?: SxProps;
  to?: To;
}

const LogoSection = ({ isIcon, sx, to }: Props) => (
  <ButtonBase disableRipple component={Link} to={!to ? APP_DEFAULT_PATH : to} sx={sx}>
    <Box
      sx={{
        borderLeft: '5px solid #16A34A',
        pl: '5px',
      }}
    >
      {isIcon ? (
        <Typography variant="h2" color="black">
          F
        </Typography>
      ) : (
        <Typography variant="h2" color="black">
          Fortunatis
        </Typography>
      )}
    </Box>
  </ButtonBase>
);

export default LogoSection;
