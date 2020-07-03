import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class CheckSubScription extends React.Component {

    static get propTypes() {
        return {
            user: PropTypes.obj,
            children: PropTypes.any
        };
    }

    render() {
        const { isLoading, isActive } = this.props.user;

        if(isLoading) {
            return <div>Loading.....</div>;
        } else {
            if(isActive === "ACTIVE") {
                return this.props.children;
            }
            return (
                <Card>
                   <CardContent>Subscribe plan to access this feature</CardContent>
                   <CardActions>
                        <Link to="/admin/subscription">
                            <Button variant="contained" color="primary">CLick here to subscribe</Button>
                        </Link>
                    </CardActions>
                </Card>
            );
        }
    }
}


const matchStateToEventProps = state => {
    return {
      user: state.userReducer
    };
};

export default connect(matchStateToEventProps)(CheckSubScription);
  