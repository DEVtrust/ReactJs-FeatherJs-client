import React from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
    root: {
        padding: 10
    },
    btnRight: {
        display: "block", 
        textAlign: "right"
    }
}));

function InfoComponnet(props) {
    const { info, closeDrawer } = props;
    const classes = useStyles();
   
    return (
        <div className={classes.root}>
            <div className={classes.btnRight}>
                <Button onClick={() => closeDrawer()}>
                    <span className="material-icons">
                    close
                    </span>
                </Button>
            </div>
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem button>
                    <ListItemText>
                    <span><b>User Agent</b></span>: <span>{info.useragent ? info.useragent : "-"}</span>
                    </ListItemText>
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText>
                    <span><b>User id</b></span>: <span>{info.user_id ? info.user_id : "-"}</span>
                    </ListItemText>
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText>
                    <span><b>Page host</b></span>: <span>{info.page_urlhost ? info.page_urlhost : "-"}</span>
                    </ListItemText>
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText>
                    <span><b>Page path</b></span>: <span>{info.page_urlpath ? info.page_urlpath : "-"}</span>
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );
}

InfoComponnet.propTypes = {
    info: PropTypes.object,
    closeDrawer: PropTypes.func
};

export default InfoComponnet;