import { Alert, Snackbar } from "@mui/material";
 import { useDispatch, useSelector } from "react-redux";
 
 export const Alerts = () => {
   const dispatch = useDispatch();
   const { open, message, severity } = useSelector(
     (state) => state.alertReducer
   );
 
   const handleClose = () => {
     dispatch({ type: "HIDE_ALERT" });
   };
 
   return (
     <Snackbar
       open={open}
       autoHideDuration={3000}
       onClose={handleClose}
       anchorOrigin={{ vertical: "top", horizontal: "center" }}
     >
       <Alert onClose={handleClose} severity={severity} variant="filled">
         {message}
       </Alert>
     </Snackbar>
   );
 };