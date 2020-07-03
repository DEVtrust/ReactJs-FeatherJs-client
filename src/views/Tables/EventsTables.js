import React from "react";
// @material-ui/core components
// import Checkbox from "@material-ui/core/Checkbox";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
/*import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";*/
/*
import Check from "@material-ui/icons/Check";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
*/

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import CollapsableTable from "components/Table/CollapsableTable";
// import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import EventsRedux from "../../containers/Events";
/*
import product1 from "assets/img/product1.jpg";
import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";*/
import { Provider } from "react-redux";

import { createLogger } from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../reducers";
import thunkMiddleware from "redux-thunk";

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default function EventsTables() {
  return (
    <Provider store={store}>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
            </CardHeader>
            <CardBody>
              <EventsRedux />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Provider>
  );
}
