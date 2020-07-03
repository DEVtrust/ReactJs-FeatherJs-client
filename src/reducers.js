import {
  AUTHENTICATION_STATUS,
  SNACKBAR_STATUS,
  CREATE_SIGNUP,
} from "./actions";

import eventsReducer from "./store/reducers/event";
import loggedInReducer from "./store/reducers/loggedIn";
import userReducer from "./store/reducers/user";
import {combineReducers} from "redux";

const initialState = {
  authenticationStatus: "",
  authenticationStatusMessage: "",
  snackBarStatus: false,
  snackBarMessage: "",
  snackBarColor: "warning",
  snackBarPlace: "tc",
};

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_SIGNUP:
      return Object.assign({}, state, {
        signupStatus: "signup started",
      });
    default:
      return state;
  }
}

function authentication(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_STATUS:
      return Object.assign({}, state, {
        authenticationStatus: action.status,
        authenticationStatusMessage: action.message,
      });
    // not handling any actions just yet
    default:
      return state;
  }
}

function snackBarStatus(state = initialState, action) {
  switch (action.type) {
    case SNACKBAR_STATUS:
      return Object.assign({}, state, {
        snackBarStatus: action.snackBarStatus,
        snackBarMessage: action.snackBarMessage,
        snackBarColor: action.snackBarColor,
        snackBarPlace: action.snackBarPlace,
      });
    default:
      return state;
  }
}

const monkey = combineReducers({
  authentication,
  snackBarStatus,
  signupReducer,
  eventsReducer,
  userReducer,
  loggedInReducer,
});

export default monkey;
