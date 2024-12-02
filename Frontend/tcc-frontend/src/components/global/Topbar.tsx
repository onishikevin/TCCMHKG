import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { TopbarProps } from '../../interfaces';

const Topbar = ({ setResetKey, resetKey }: TopbarProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const handleResetGraph = () => {
    setResetKey(resetKey + 1); // Atualiza a chave para desmontar/remontar o componente
  };

  return (
    <Box display="flex" justifyContent="space-between" p={1}>
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px"></Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon fontSize="large" />
          ) : (
            <LightModeOutlinedIcon fontSize="large" />
          )}
        </IconButton>
        <IconButton onClick={handleResetGraph}>
          <RestartAltOutlinedIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
