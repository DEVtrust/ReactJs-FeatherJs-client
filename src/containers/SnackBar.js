import { connect } from "react-redux";
import Snackbar from "../components/Snackbar/Snackbar";

//https://redux.js.org/basics/usage-with-react

const snackBarProps = state => {
  console.log("snackBarProps", state);
  return [
    state.snackBarStatus.snackBarMessage,
    state.snackBarStatus.snackBarStatus,
    state.snackBarStatus.snackBarColor,
    state.snackBarStatus.snackBarPlace,
  ];
};

// 1. have a mapStateToProps function here..  change the "open" prop of Snackbar
//  I think the closeNotification prop needs to change too
const mapStateToSnackBarProps = state => {
  const [message, status, color, place] = snackBarProps(state);
  console.log(message, status, color, place);
  return {
    open: status,
    message: message,
    color: color,
    place: place,
  };
};

// 2. have a mapDispatchToProps function here
// I"m not sure what to do here.  ...I think it"s to map the authenticate action

/*const mapDispatchToProps = dispatch => {
  return {
    
  }
}*/

// 3. use the connect method to connect the snackbar component to those two

const SnackBarRedux = connect(mapStateToSnackBarProps /*, mapDispatchToProps*/)(
  Snackbar
);

export default SnackBarRedux;

// Then this gets imported into LoginPage.js  ...I think - instead of regular Snackbar
