export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";

const initialState = {
    open: false,
    message: "",
    severity: "",
};


export const showAlert = (message, severity) => ({
    type: SHOW_ALERT,
    payload: { message, severity },
  });

export const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                open: true,
                message: action.payload.message,
                severity: action.payload.severity,
                };
                case HIDE_ALERT:
                    return {
                        ...state,
                        open: false,
                    };
                    default:
                        return state;

    }
};

export default alertReducer;