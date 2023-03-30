import React from 'react';

import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  useMediaQuery,
  // useTheme,
} from '@mui/material';
  import { useTheme } from '@mui/material/styles';
import {
  DarkMode,
  Home,
  Business,
  Add,
  Edit,
  Store,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../../context';
import Navbar from '../navbar/NavBar';
interface ILeftDrawer {
  children?: JSX.Element[] | React.ReactElement;
}
const LeftDrawer: React.FC<ILeftDrawer> = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggleTheme, themeName } = useAppThemeContext();

  React.useEffect(() => {
    console.log(theme);
  }, []);

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  function handleClick() {
    console.log(theme);
  }

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  return (
    <>
      <Box>
        <Drawer
          open={isDrawerOpen}
          variant={mobile ? 'temporary' : 'permanent'}
          onClose={toggleDrawerOpen}
        >
          <Box
            width={theme.spacing(28)}
            height={'100%'}
            display={'flex'}
            flexDirection={'column'}
          >
            <Box
              height={theme.spacing(20)}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Avatar
                sx={{
                  height: theme.spacing(12),
                  width: theme.spacing(12),
                }}
              />
            </Box>
            <Divider />
            <Box flex={1}>
              <List component={'nav'}>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Página inicial" />
                </ListItemButton>

                <Divider />

                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <Business />
                  </ListItemIcon>
                  <ListItemText primary="Empresa" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate('/criar-empresa')}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Criar" />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText primary="Editar ou Excluir" />
                </ListItemButton>

                <Divider />
                <Divider />

                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <Store />
                  </ListItemIcon>
                  <ListItemText primary="Fornecedor" />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Criar" />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText primary="Editar ou Excluir" />
                </ListItemButton>

                <Divider />

                <ListItemButton>
                  <ListItemIcon>
                    <DarkMode />
                  </ListItemIcon>
                  <Switch
                    onChange={toggleTheme}
                    checked={themeName === 'dark'}
                  />
                </ListItemButton>
              </List>
            </Box>
          </Box>
        </Drawer>
        <Navbar/>
        <Box height={'100vh'} marginLeft={mobile ? 0 : theme.spacing(28)} padding={2} sx={{backgroundColor: theme.palette.background.default}}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default LeftDrawer;
