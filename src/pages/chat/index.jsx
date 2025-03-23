
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  InputAdornment,
} from "@mui/material";


import CodeIcon from "@mui/icons-material/Code"; 
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"; 
import SchoolIcon from "@mui/icons-material/School"; 
import BrushIcon from "@mui/icons-material/Brush"; 


import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic"; 
import ImageIcon from "@mui/icons-material/Image"; 

import { PromptCard } from "../../components/card";
import { setInput, onSent } from "../../redux/chat-actions";


const prompts = [
  {
    id: 1,
    text: "Explain the difference between React and Angular",
    icon: <CodeIcon />,
  },
  {
    id: 2,
    text: "How does blockchain technology work?",
    icon: <CodeIcon />,
  },

  
  {
    id: 3,
    text: "What are the benefits of a Mediterranean diet?",
    icon: <LocalHospitalIcon />,
  },
  {
    id: 4,
    text: "How can I improve my sleep quality?",
    icon: <LocalHospitalIcon />,
  },

  
  {
    id: 5,
    text: "What are the key principles of effective learning?",
    icon: <SchoolIcon />,
  },
  {
    id: 6,
    text: "How can I prepare for a job interview?",
    icon: <SchoolIcon />,
  },

  
  {
    id: 7,
    text: "Suggest creative writing prompts for a novel",
    icon: <BrushIcon />,
  },
  {
    id: 8,
    text: "What are some unique ideas for a photography project?",
    icon: <BrushIcon />,
  },
];


const VoiceInput = ({ setInput }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
  };

  return (
    <IconButton onClick={startListening} disabled={isListening}>
      <MicIcon />
      {isListening && <CircularProgress size={24} sx={{ position: "absolute" }} />}
    </IconButton>
  );
};

const ImageUpload = ({ setImage }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };


  return (
    <IconButton component="label">
      <ImageIcon />
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </IconButton>
  );
}

export const Chat = () => {
  const dispatch = useDispatch();
  const { input, loading, showResult, resultData } = useSelector(
    (state) => state.chatReducer
  );
  const [image, setImage] = useState(null); 

  const handleSelectPrompt = (text) => {
    dispatch(setInput(text));
  };

  const handleSubmit = () => {
    dispatch(onSent());
    
    if (image) {
      console.log("Image uploaded:", image);
    }
  };

  const handleChange = (event) => {
    dispatch(setInput(event.target.value));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {!showResult ? (
          <>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                color: "#4285F4",
                textAlign: "center",
                mt: 2,
              }}
            >
              Hello, Tatevik
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 3, textAlign: "center", color: "grey" }}
            >
              How can I help you today?
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", 
                gap: 2, 
                justifyContent: "center",
                alignItems: "center", 
                maxWidth: "1200px", 
                margin: "0 auto", 
                mt: "120px",
                
              }}
            >
              {prompts.map(({ text, icon, id }) => (
                <PromptCard
                  key={id}
                  text={text}
                  icon={icon}
                  onSelect={handleSelectPrompt}
                />
              ))}
            </Box>
          </>
        ) : (
          <Box sx={{ maxHeight: "70vh", overflowY: "auto" }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Here's what I found:
                </Typography>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                />
                {image && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">Uploaded Image:</Typography>
                    <img
                      src={image}
                      alt="Uploaded"
                      style={{ maxWidth: "100%", borderRadius: "8px" }}
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
        )}
      </Box>

      
      <Box
        sx={{
          p: 2,
          backgroundColor: "white",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          fullWidth
          multiline
          variant="outlined"
          placeholder="Enter a prompt here"
          onChange={handleChange}
          value={input}
          onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
          sx={{ border: "none", outline: "none" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VoiceInput setInput={(text) => dispatch(setInput(text))} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <ImageUpload setImage={setImage} />
                <IconButton onClick={handleSubmit}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>


      <Box
        sx={{
          textAlign: "center",
          p: 2,
          backgroundColor: "#f0f4f9",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Gemini may display info, including about people, so double-check its
          responses. Your privacy and Gemini Apps.
        </Typography>
      </Box>
    </Box>
  );
};

export default Chat;
