import { SET_UNAUTH_ALERT_ON_PAGE, CLEAR_ALERT_ON_PAGE } from "../reducers/loggedIn";

export const clearShowAlert = () => dispatch => {
    dispatch({
        type: CLEAR_ALERT_ON_PAGE
    });
};

export const setShowAlert = () => dispatch => {
    console.log("Called#########");
    dispatch({
        type: SET_UNAUTH_ALERT_ON_PAGE
    });
};