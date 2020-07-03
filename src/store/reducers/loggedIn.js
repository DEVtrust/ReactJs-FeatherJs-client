export const SET_USER_LOGIN_STATUS = "SET_USER_LOGIN_STATUS";
export const CLEAR_USER_LOGIN_MSG = "CLEAR_USER_LOGIN_MSG";
export const SET_UNAUTH_ALERT_ON_PAGE = "SET_UNAUTH_ALERT_ON_PAGE";
export const CLEAR_ALERT_ON_PAGE = "CLEAR_ALERT_ON_PAGE";

const initialUserState = {
    isLoggedIn: false,
    isLoading: true,
    msg: null,
    showAlert: false
};
  
function loggedInReducer(state = initialUserState, action) {
    // console.log("TRIGGER USER ### SET", action, state);
  switch (action.type) {
    case SET_USER_LOGIN_STATUS: {
        return {
            ...state,
            ...action.data
        };
    }
    case CLEAR_USER_LOGIN_MSG: {
        return {
            ...state,
            msg: null
        };
    }
    case SET_UNAUTH_ALERT_ON_PAGE: {
        return {
            ...state,
            showAlert: true
        };
    }
    case CLEAR_ALERT_ON_PAGE: {
        return {
            ...state,
            showAlert: false
        };
    }
    default: {
        return state;
    }
  }
}

  
export default loggedInReducer;