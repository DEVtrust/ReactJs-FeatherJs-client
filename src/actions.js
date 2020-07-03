import io from "socket.io-client";
import feathers from "@feathersjs/client";

const _ = require("lodash");
const client = feathers();
const socket = io("http://localhost:3030");
client.configure(feathers.socketio(socket));
client.configure(feathers.authentication());
const signupService = client.service("signup");
const eventService = client.service("events");

export const AUTHENTICATE = "AUTHENTICATE";
export const AUTHENTICATION_STATUS = "AUTHENTICATION_STATUS";
export const REAUTHENTICATE = "REAUTHENTICATE";
export const SNACKBAR_STATUS = "SNACKBAR_STATUS";
export const CREATE_SIGNUP = "CREATE_SIGNUP";
export const UPDATE_EVENTS_TABLE = "UPDATE_EVENTS_TABLE";

export function updateEvents() {
  return dispatch => {
    client.reAuthenticate();
    eventService.find().then(data => dispatch(updateEventsTable(data)));
  };
}

export function updateEventsTable(rows = []) {
  console.log("updateEventsTable", rows);
  return {
    type: UPDATE_EVENTS_TABLE,
    rows,
  };
}

export function createSignup() {
  return dispatch => {
    const signupPayload = {
      text: "Sign up testing",
      firstname: document.querySelector("input[id='firstName']").value,
      lastname: document.querySelector("input[id='lastName']").value,
      email: document.querySelector("input[id='email']").value,
      organization: document.querySelector("input[id='organization']").value,
      password: document.querySelector("input[id='password']").value,
    };

    // eslint-disable-next-line no-unused-vars
    for (let i in signupPayload) {
      if (!signupPayload[i]) {
        dispatch(
          setSnackBarStatus(true, "Please complete the entire form first")
        );
        return;
      }
    }

    if (
      document.querySelector("input[id='password']").value !==
      document.querySelector("input[id='verifyPassword']").value
    ) {
      dispatch(setSnackBarStatus(true, "The passwords do not match"));
      return;
    }

    const tosAccept = document.querySelector("input[id='tosAccept']").checked;
    if (!tosAccept) {
      dispatch(
        setSnackBarStatus(
          true,
          "Please confirm that your have read and accept our terms of service and privacy policy"
        )
      );
      return;
    }

    const successAlert = () => {
      dispatch(
        setSnackBarStatus(
          true,
          "Signup complete.  Please check your email for a confirmation link",
          "info"
        )
      );
      _.delay(() => {
        window.location.href = "/admin/dashboard";
      }, 500);
    };

    return signupService
      .create(signupPayload)
      .then(resp => {
        console.log("resp", resp);
        successAlert();
      })
      .catch(error => {
        console.log("error", error);
        const e = error.errors[0];
        let reason = e.message;
        switch (e.message) {
          case "email must be unique":
            reason = `Signup failed for ${e.value}. The email address is already registered`;
            break;
          default:
            break;
        }
        dispatch(setSnackBarStatus(true, reason));
      });
  };
}

export function setSnackBarStatus(
  snackBarStatus,
  snackBarMessage = "",
  snackBarColor = "warning",
  snackBarPlace = "tc"
) {
  return {
    type: SNACKBAR_STATUS,
    snackBarStatus,
    snackBarMessage,
    snackBarColor,
    snackBarPlace,
  };
}

export function authenticationStatus(status, message) {
  return {
    type: AUTHENTICATION_STATUS,
    status,
    message,
  };
}

export function reAuthenticate() {
  return dispatch => {
    dispatch(authenticationStatus("reAuthenticating"));
    return client
      .reAuthenticate()
      .then(r => {
        console.log(r);
      })
      .catch(r => {
        console.log("reAuthenticate", r);
        switch (r.code) {
          case 401:
            dispatch(authenticationStatus(r.message));
            dispatch(authenticate());
            break;
          default:
            break;
        }
      });
  };
}

export function authenticate() {
  return dispatch => {
    dispatch(authenticationStatus(false, "attempting login"));
    const credentials = {
      email: document.querySelector("input[id='email']").value,
      password: document.querySelector("input[id='password']").value,
      strategy: "local",
    };
    return client
      .authenticate(credentials)
      .then(r => {
        console.log("success", r);
        if (r.user.isVerified) {
          if (r.accessToken) {
            dispatch(authenticationStatus(r.code, "success"));
            dispatch(setSnackBarStatus(true, "Login Successful", "info"));
            _.delay(() => {
              window.location.href = "/admin/dashboard";
            }, 500);
          }
        } else {
          /* 
         There really shouldn"t even be a token here.  The authentication API should 
          not send a token back if the user isn"t verified
          */
          delete window.localStorage["feathers-jwt"];
          dispatch(authenticationStatus(r.code, "email is not verified"));
          dispatch(
            setSnackBarStatus(
              true,
              "You email address has not been verified.  Please click the email verification link that was emailed to you"
            )
          );
        }
      })

      .catch(r => {
        console.log("authenticate", r);
        switch (r.code) {
          default:
            dispatch(authenticationStatus(r.code, r.message));
            dispatch(setSnackBarStatus(true, r.message));
        }
      });
  };
}
