

import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

 export const Header =() =>  {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#FFF", 
        boxShadow: "none", 
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: "#4285F4", 
            fontWeight: "bold", 
          }}
        >
          Open AI
        </Typography>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            ml: 1,
            bgcolor: "#4285F4",
            border: "2px solid #4285F4",
          }}
        >
          <PersonIcon /> 
          </Avatar>
      </Toolbar>
    </AppBar>
  );
};

