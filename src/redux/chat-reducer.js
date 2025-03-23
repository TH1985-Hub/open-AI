import {chatTypes} from "./chat-actions";

const initialState = {
    input: "",
    apiKey: "",
    loading: false,
    showResult: false,
    resultData: "",

} ;

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case chatTypes.SET_INPUT:
            return {
                ...state,
                input: action.payload
    };
    case chatTypes.SET_API_KEY:
        return {
            ...state,
            apiKey: action.payload
            };

    case chatTypes.SET_SHOW_RESULT:
                return {
                    ...state,
                    showResult: action.payload
                    };

    case chatTypes.SET_LOADING:
                        return {
                            ...state,
                            loading: action.payload
                            };

    case chatTypes.SET_RESULT_DATA:
                        return {
                           ...state,
                            resultData: action.payload
                        };


            default:
                return state;

}
};

export default chatReducer;
