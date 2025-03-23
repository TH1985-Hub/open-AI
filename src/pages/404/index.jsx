import {Box, Container, Typography, Button} from "@mui/material";
import { Link} from "react-router";

export const NotFoundPage = () => {
    return (
        <Container maxWidth="sm">
            <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center'
                }}
                >
                    <Typography
                     variant="h1"
                    component="h2"
                    color="primary"
                    sx={{ fontSize: "6rem", fontWeight: "bold" }}
                    >
                        404
                    </Typography>
                    <Typography variant="h5" color="textSecondary" sx={{ marginBottom: 2 }}>
          {`Oops! The page you're looking for doesn't exist.`}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginBottom: 4 }}
        >
          {`It looks like the page you're trying to reach is not available. You might want to check the URL or
                        go back to the homepage.`}
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
          sx={{ padding: "10px 30px", borderRadius: "50px" }}
        >
          Go Back Home
        </Button>
                

            </Box>
        </Container>
    );
};