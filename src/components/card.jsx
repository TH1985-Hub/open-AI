
import { Card, CardContent, Typography } from "@mui/material";
import styles from "./card.module.css";

export const PromptCard = ({ onSelect, text, icon }) => {
  return (
    <Card
      className={styles.card}
      onClick={() => onSelect(text)}
      variant="outlined"
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "#333",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)", 
          }}
        >
          {text}
        </Typography>
        <span className={styles["card-icon"]}>{icon}</span>
      </CardContent>
    </Card>
  );
};