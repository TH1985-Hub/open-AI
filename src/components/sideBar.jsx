

import {useState} from "react";
import { NavLink } from "react-router";
import {
  Drawer,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";


import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

export const SideBar = () => {
  const [extended, setExtended] = useState(false);

  return (
    <Drawer
    variant="permanent"
    sx={{
      width:  extended ? 250 : 80,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
       backgroundColor: "#f0f4f9",
       width: extended ? 250 : 80,
       transition: "width 0.15s ease, padding 0.3s ease",
       display: "flex",
       flexDirection: "column",
       justifyContent: "space-between",
       padding: "10px",
       overflow: "hidden",
      },
    }}
    >
      <List>
        <ListItem button="true" onClick={() => setExtended(!extended)}>
          <ListItemIcon>
            <MenuIcon/>
          </ListItemIcon>
        </ListItem>
        <ListItem component={NavLink} to="/">
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <Fade in={extended} timeout={300}>
            <ListItemText primary="New chat" />
          </Fade>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem component={NavLink} to="/activities">
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <Fade in={extended} timeout={300}>
          <ListItemText primary="Activities" />
        </Fade>
        </ListItem>

        <ListItem component={NavLink} to="/help">
        <ListItemIcon>
          <HelpOutlineIcon />
        </ListItemIcon>
        <Fade in={extended} timeout={300}>
          <ListItemText primary="Help" />
        </Fade>
        </ListItem>

        <ListItem component={NavLink} to="/settings">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <Fade in={extended} timeout={300}>
          <ListItemText primary="Settings" />
        </Fade>
        </ListItem>
      </List>
    </Drawer>
  );
};