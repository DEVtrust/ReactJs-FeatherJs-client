import React from "react";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../reducers";
import { authenticate, setSnackBarStatus } from "../../actions";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

import io from "socket.io-client";
import feathers from "@feathersjs/client";

import SnackBarRedux from "../../containers/SnackBar";
import AddAlert from "@material-ui/icons/AddAlert";

const client = feathers();
const socket = io("http://localhost:3030");
client.configure(feathers.socketio(socket));
client.configure(feathers.authentication());

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);


export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const login = async () => {
    store.dispatch(authenticate());
  };

  const useStyles = makeStyles(styles);

  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();

  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setTl of unmounted component
      let id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  return (
    <Provider store={store}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form>
              <Card login className={classes[cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Log in</h4>
                  <div className={classes.socialLine}>
                    {[
                      "fab fa-facebook-square",
                      "fab fa-twitter",
                      "fab fa-google-plus",
                    ].map((prop, key) => {
                      return (
                        <Button
                          color="transparent"
                          justIcon
                          key={key}
                          className={classes.customButtonClass}
                        >
                          <i className={prop} />
                        </Button>
                      );
                    })}
                  </div>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      type: "password",
                      autoComplete: "off",
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    onClick={() => {
                      login();
                    }}
                    color="rose"
                    simple
                    size="lg"
                    block
                  >
                    Let{"'"}s Go
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
        <SnackBarRedux
          place="tc"
          color="warning"
          icon={AddAlert}
          message="DEFAULT MESSAGE"
          open={false}
          closeNotification={() => store.dispatch(setSnackBarStatus(false))}
          close
        />
      </div>
    </Provider>
  );
}
