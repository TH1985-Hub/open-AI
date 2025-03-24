// //import { useEffect } from "react";
// import { geminiService } from "../config/gemini";
// import {showAlert} from "./alert-reducer";

// export const SET_INPUT = "SET_INPUT";
// export const SET_API_KEY = "SET_API_KEY";
// export const SET_LOADING = "SET_LOADING";
// export const SET_RESULT_DATA = "SET_RESULT_DATA";
// export const SET_SHOW_RESULT = "SET_SHOW_RESULT";

// export const chatTypes = {
//     SET_INPUT,
//     SET_API_KEY,
//     SET_LOADING,
//     SET_RESULT_DATA,
//     SET_SHOW_RESULT,
// };

// export const setInput = (input) => ({
//     type: chatTypes.SET_INPUT,
//     payload: input,
// });

// export const setApiKey = (apiKey) => ({
//     type: chatTypes.SET_API_KEY,
//     payload: apiKey,
// });

// export const setLoading = (loading) => ({
//     type: chatTypes.SET_LOADING,
//     payload: loading,
// });

//    export const setResultData = (data) => ({
//     type: chatTypes.SET_RESULT_DATA,
//     payload: data,
//    });

//    export const setShowResult = (showResalt) => ({
//     type: chatTypes.SET_SHOW_RESULT,
//     payload: showResalt,
//    });

// //    useEffect(() => {
// //     geminiService.initialize(process.env.GEMINI_API_KEY);
// //   }, []);

// export const onSent = () => async (dispatch, getState) => {


  
//     try{
//         dispatch(setLoading(true));
//         dispatch(setShowResult(true));

//         const state = getState();
//         const prompt = state.chatReducer.input;

        
//         console.log("state:", state);
        

//         let response = await geminiService.runWithPrompt(prompt);
//         let responseArray = response.split("**");
//         let newResponse = responseArray
//           .map((word, i) => (i % 2 === 1 ? `<b>${word}</b>` : word))
//           .join("");
//         let newResponse2 = newResponse.split("*").join("</br>");
//         let newResponseArray = newResponse2.split(" ");


//         console.log("newResponseArray:", newResponse2);


//      newResponseArray.forEach((nextWord, index) => {
//         const privText = getState().chatReducer.resultData;
//         console.log(privText);


//        setTimeout(() => {
//         dispatch(
//           setResultData(getState().chatReducer.resultData + nextWord + " ")
//         );
//       }, 75 * index);

//       dispatch(setInput(""));
//     });
//        // dispatch(setResultData(newResponse2));
//     } catch (error) {
//         console.log("Error sending message", error);
//         dispatch(showAlert(error.message, "error"));
//     } finally {
//         dispatch(setLoading(false));
//     }
// };

import { geminiService } from "../config/gemini";
import { showAlert } from "./alert-reducer";

export const SET_INPUT = "SET_INPUT";
export const SET_API_KEY = "SET_API_KEY";
export const SET_LOADING = "SET_LOADING";
export const SET_RESULT_DATA = "SET_RESULT_DATA";
export const SET_SHOW_RESULT = "SET_SHOW_RESULT";
export const CLEAR_API_KEY = "CLEAR_API_KEY";

export const chatTypes = {
  SET_INPUT,
  SET_API_KEY,
  SET_LOADING,
  SET_RESULT_DATA,
  SET_SHOW_RESULT,
  CLEAR_API_KEY
};

export const setInput = (input) => ({
  type: chatTypes.SET_INPUT,
  payload: input,
});

export const setApiKey = (apiKey) => ({
  type: chatTypes.SET_API_KEY,
  payload: apiKey,
});

export const clearApiKey = () => ({
  type: chatTypes.CLEAR_API_KEY,  
});

export const setLoading = (loading) => ({
  type: chatTypes.SET_LOADING,
  payload: loading,
});

export const setResultData = (data) => ({
  type: chatTypes.SET_RESULT_DATA,
  payload: data,
});

export const setShowResult = (showResult) => ({
  type: chatTypes.SET_SHOW_RESULT,
  payload: showResult,
});

const processResponse = (response) => {
  let formattedResponse = response
    .split("**")
    .map((word, i) => (i % 2 === 1 ? `<b>${word}</b>` : word))
    .join("");
  formattedResponse = formattedResponse.split("*").join("</br>");
  return formattedResponse.split(" ");
};

export const onSent = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    dispatch(setShowResult(true));

    const state = getState();
    const prompt = state.chatReducer.input;

    console.log("State:", state);

    const response = await geminiService.runWithPrompt(prompt);
    const responseArray = processResponse(response);

    responseArray.forEach((nextWord, index) => {
      setTimeout(() => {
        const currentText = getState().chatReducer.resultData;
        dispatch(setResultData(currentText + nextWord + " "));
      }, 75 * index);
    });

    
    dispatch(setInput(""));
  } catch (error) {
    console.error("Error sending message:", error);
    dispatch(showAlert(error.message || "An error occurred. Please try again.", "error"));
  } finally {
    dispatch(setLoading(false));
  }
};

