
import React from "react";
import ReactDOM from "react-dom";

import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AuthLayout from "layouts/Auth.js";
import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { setLoggedInUser } from "./store/actions/user";
import PropTypes from "prop-types";
import feathers from "@feathersjs/client";
import routes from "./routes";

import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

const hist = createBrowserHistory();
const client = feathers();
// const socket = io("http://3.15.46.47:3030");
// client.configure(feathers.socketio(socket));
client.configure(feathers.authentication());
// const eventService = client.service("events");

const loggerMiddleware = createLogger();
export const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
class App extends React.Component {  
  componentDidMount(){
    store.dispatch(setLoggedInUser());
  }

  render() {
    return  (
      <Provider store={store}>
        <Router history={hist}>
          <RouterConnect />
        </Router>
      </Provider>
    );
  }
}


class RouterComponent extends React.Component {
  static get propTypes() {
    return {
      loggedIn: PropTypes.object,
      history: PropTypes.object,
      location: PropTypes.object
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    if(!props.loggedIn.isLoading && !props.loggedIn.isLoggedIn && props.loggedIn.msg === "REDIRECT") {
      store.dispatch({
        type: "CLEAR_USER_LOGIN_MSG"
      });
      const pathname = this.props.location.pathname;
      /* eslint-disable no-unused-vars */
      for(let i in routes) {
        if(pathname.includes(routes[i].path)) {
          if(routes[i].isAuthRequired) {
            this.props.history.push("/auth");
          } else {
            return;
          }
        }
      }
     
    }
    if(props.loggedIn.isLoggedIn && props.location.pathname.includes("auth")) {
      this.props.history.push("/admin");
    }
  }

  render(){
    return (
      <Switch>
        <Route path="/rtl" component={RtlLayout} />
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    );
  }
}

const matchStateToEventProps = state => {
  return {
    loggedIn: state.loggedInReducer
  };
};

const RouterConnect = connect(matchStateToEventProps)(withRouter(RouterComponent));

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
