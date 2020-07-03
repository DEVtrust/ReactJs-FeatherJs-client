import * as React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withRouter } from "react-router-dom";
import { clearShowAlert } from "../../store/actions/loggedIn";
import PropTypes from "prop-types";

class UnAuthModel extends React.Component {
    static get propTypes() {
        return {
            dispatch: PropTypes.func,
            history: PropTypes.object,
            loggedIn: PropTypes.object
        };
    }
    
    redirectTo() {
        this.props.dispatch(clearShowAlert());
        this.props.history.push("/auth");
    }

    render() {
        const { showAlert } = this.props.loggedIn; 
        return (
            <Dialog
                open={showAlert}
                onClose={() => {
                    this.redirectTo();
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Your session is expipred. Please login again.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => {
                    this.redirectTo();
                }} color="primary" autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedInReducer
    };
};

export default connect(mapStateToProps)(withRouter(UnAuthModel));