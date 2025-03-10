import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Settings, Send } from '@mui/icons-material';
import { Link } from 'react-router';

const SideBar = ({ isDrawerOpen, setDrawerOpen }) => {
  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Form', icon: <Send />, path: '/form' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      open={isDrawerOpen}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            component={Link}
            to={item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;