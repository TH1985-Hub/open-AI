

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Box, Button, TextField, Typography } from "@mui/material";
// import { geminiService } from "../../config/gemini";
// import { setApiKey } from "../../redux/chat-actions";

// export const Settings = () => {
//   const dispatch = useDispatch();
//   const { apiKey } = useSelector((state) => state.chatReducer);
//   const [apiKeyInMemory, setApiKeyInMemory] = useState(apiKey || "");

//   useEffect(() => {
//     const savedApiKey = localStorage.getItem("apiKey");
//     if (savedApiKey) {
//       setApiKeyInMemory(savedApiKey);
//       dispatch(setApiKey(savedApiKey));
//       geminiService.initialize(savedApiKey);
//     }
//   }, [dispatch]);

//   const handleSaveApiKey = () => {
//     if (!apiKeyInMemory || apiKeyInMemory.trim() === "") {
//       alert("Please enter a valid API key.");
//       return;
//     }
//     try {
//       dispatch(setApiKey(apiKeyInMemory));
//       geminiService.initialize(apiKeyInMemory);
//       localStorage.setItem("apiKey", apiKeyInMemory);  
//       alert("API key saved successfully!");
//     } catch (error) {
//       alert("Failed to initialize the service. Please check your API key.");
//       console.error("Initialization error:", error);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100%",
//         gap: 2,
//       }}
//     >
//       <Box display="flex" flexDirection="column" alignItems="center">
//         <Typography variant="h4">Settings</Typography>
//         <Typography
//           variant="body1"
//           color="textSecondary"
//           textAlign="center"
//           mb={2}
//         >
//           Enter your API key below to connect your AI workflow with external
//           services.
//         </Typography>
//         <TextField
//           type="password"
//           value={apiKeyInMemory}
//           onChange={(e) => setApiKeyInMemory(e.target.value)}
//           label="API Key"
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//         <Button variant="contained" color="primary" onClick={handleSaveApiKey}>
//           Save API Key
//         </Button>
//         {apiKey && (
//           <Typography variant="body2" color="success.main">
//             API key saved successfully!
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Settings;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { geminiService } from "../../config/gemini";
import { setApiKey, clearApiKey } from "../../redux/chat-actions";

export const Settings = () => {
  const dispatch = useDispatch();
  const { apiKey } = useSelector((state) => state.chatReducer);
  const [apiKeyInMemory, setApiKeyInMemory] = useState(apiKey || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedApiKey = localStorage.getItem("apiKey");
    if (savedApiKey) {
      setApiKeyInMemory(savedApiKey);
      dispatch(setApiKey(savedApiKey));
      geminiService.initialize(savedApiKey);
    }
  }, [dispatch]);

  const handleSaveApiKey = async () => {
    if (!apiKeyInMemory || apiKeyInMemory.trim() === "") {
      setError("Please enter a valid API key.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
       
      if (apiKeyInMemory.length < 10) {
        throw new Error("API key is too short.");
      }

       geminiService.initialize(apiKeyInMemory);

      
      dispatch(setApiKey(apiKeyInMemory));
      localStorage.setItem("apiKey", apiKeyInMemory);

      alert("API key saved successfully!");
    } catch (error) {
      setError("Failed to initialize the service. Please check your API key.");
      console.error("Initialization error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearApiKey = () => {
    dispatch(clearApiKey());
    localStorage.removeItem("apiKey");
    setApiKeyInMemory("");
    alert("API key cleared successfully!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 2,
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" width="100%" maxWidth="400px">
        <Typography variant="h4">Settings</Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          textAlign="center"
          mb={2}
        >
          Enter your API key below to connect your AI workflow with external services.
        </Typography>

        <TextField
          type="password"
          value={apiKeyInMemory}
          onChange={(e) => setApiKeyInMemory(e.target.value)}
          label="API Key"
          fullWidth
          sx={{ mb: 2 }}
          disabled={isLoading}
        />

        {error && (
          <Typography variant="body2" color="error.main" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveApiKey}
          disabled={isLoading}
          fullWidth
          sx={{ mb: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Save API Key"}
        </Button>

        {apiKey && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearApiKey}
            fullWidth
          >
            Clear API Key
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Settings;
