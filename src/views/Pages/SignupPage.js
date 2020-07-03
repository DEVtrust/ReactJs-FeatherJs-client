import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import feathers from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import SnackBarRedux from "../../containers/SnackBar";
import AddAlert from "@material-ui/icons/AddAlert";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../reducers";
import thunkMiddleware from "redux-thunk";
import { setSnackBarStatus, createSignup } from "../../actions";

const useStyles = makeStyles(styles);

export default function SignupPage() {
  const [checked, setChecked] = React.useState([]);

  const feathersApp = feathers();
  const resClient = rest("http://localhost:3030");
  feathersApp.configure(resClient.fetch(window.fetch));

  const loggerMiddleware = createLogger();
  const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const classes = useStyles();
  return (
    <Provider store={store}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Signup</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <InfoArea
                      title="Marketing"
                      description="We've created the marketing campaign of the website. It was a very interesting collaboration."
                      icon={Timeline}
                      iconColor="rose"
                    />
                    <InfoArea
                      title="Fully Coded in HTML5"
                      description="We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."
                      icon={Code}
                      iconColor="primary"
                    />
                    <InfoArea
                      title="Built Audience"
                      description="There is also a Fully Customizable CMS Admin Dashboard for this product."
                      icon={Group}
                      iconColor="info"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={8} md={5}>
                    <div className={classes.center}>
                      <Button justIcon round color="twitter">
                        <i className="fab fa-twitter" />
                      </Button>{" "}
                      <Button justIcon round color="dribbble">
                        <i className="fab fa-dribbble" />
                      </Button>{" "}
                      <Button justIcon round color="facebook">
                        <i className="fab fa-facebook-f" />
                      </Button>{" "}
                      <h4 className={classes.socialTitle}>or be classical</h4>
                    </div>
                    <form className={classes.form}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        id="firstName"
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "First Name...",
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        id="lastName"
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Icon
                                className={classes.inputAdornmentIcon}
                              ></Icon>
                            </InputAdornment>
                          ),
                          placeholder: "Last Name...",
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        id="email"
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "Email...",
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        id="password"
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Icon className={classes.inputAdornmentIcon}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          placeholder: "Create your password...",
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        id="verifyPassword"
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Icon
                                className={classes.inputAdornmentIcon}
                              ></Icon>
                            </InputAdornment>
                          ),
                          placeholder: "Retype your password...",
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        id="organization"
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Icon className={classes.inputAdornmentIcon}>
                                business_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          placeholder: "Organization name...",
                        }}
                      />
                      <FormControlLabel
                        classes={{
                          root: classes.checkboxLabelControl,
                          label: classes.checkboxLabel,
                        }}
                        control={
                          <Checkbox
                            id="tosAccept"
                            tabIndex={-1}
                            onClick={() => handleToggle(1)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot,
                            }}
                          />
                        }
                        label={
                          <span>
                            I agree to the{" "}
                            <a href="#pablo">terms and conditions</a>.
                          </span>
                        }
                      />
                      <div className={classes.center}>
                        <Button
                          onClick={() => {
                            store.dispatch(createSignup());
                          }}
                          round
                          color="primary"
                        >
                          Get started
                        </Button>
                      </div>
                    </form>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
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
