import React from "react";

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
  useTheme,
} from "@mui/material";
import { DarkMode, Home } from "@mui/icons-material";
import { useAppThemeContext, useDrawerContext } from "../../context";
interface ILeftDrawer {
  children?: JSX.Element[] | React.ReactElement;
}
const LeftDrawer: React.FC<ILeftDrawer> = ({ children }) => {
  const theme = useTheme();
  const { toggleTheme } = useAppThemeContext();

  React.useEffect(() => {console.log(theme)},[])

  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {isDrawerOpen, toggleDrawerOpen} = useDrawerContext();
  return (
    <>
      <Box>
        <Drawer open={isDrawerOpen} variant={mobile ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
          <Box
            width={theme.spacing(28)}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Box
              height={theme.spacing(20)}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
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
              <List component={"nav"}>
                <ListItemButton>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Página inicial" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <DarkMode />
                  </ListItemIcon>
                  <Switch onChange={toggleTheme} />
                </ListItemButton>
              </List>
            </Box>
          </Box>
        </Drawer>
        <Box height={"100vh"} marginLeft={mobile ? 0 : theme.spacing(28)}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default LeftDrawer;
