import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="30px">
      <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ mx: '10px' }}>
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
