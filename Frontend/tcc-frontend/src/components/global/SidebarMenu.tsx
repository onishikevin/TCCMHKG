import { useState } from 'react';
import { Sidebar, Menu, MenuItem, menuClasses, SubMenu } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { ItemProps } from '../../interfaces';

const SidebarMenu = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setIsSelected] = useState<string>('GraphDashboard');

  const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
        rootStyles={{
          ['.' + menuClasses.button]: {
            padding: '5px 35px 5px 20px !important',
            '&:hover': {
              color: '#868dfb !important',
            },
          },
          ['.' + menuClasses.active]: {
            color: '#6870fa !important',
          },
        }}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

  return (
    <Box height="100%">
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={`${colors.primary[400]}`}
        rootStyles={{
          borderRightStyle: 'none',
          height: '100%',
        }}
      >
        <Menu>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  TCC MH-KG
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`./graph.png`}
                  style={{ cursor: 'pointer', borderRadius: '60%' }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: '10px 0 0 0' }}
                >
                  Multi-Hop With KG
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Gabriel Brandão & Kevin Onishi
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <SubMenu
              label={
                <Typography variant="h6" sx={{ m: '15px 0 5px 20px' }}>
                  Navegação
                </Typography>
              }
              rootStyles={{
                ['& > .' + menuClasses.button]: {
                  color: `${colors.grey[300]} !important`,
                  '&:hover': {
                    color: '#868dfb !important',
                  },
                },
                ['.' + menuClasses.subMenuContent]: {
                  backgroundColor: `${colors.primary[400]}`,
                },
              }}
            >
              <Item
                title="Graph Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setIsSelected}
              />

              <Item
                title="About"
                to="/about"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setIsSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarMenu;
