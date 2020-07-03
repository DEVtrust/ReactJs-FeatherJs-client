import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import moment from "moment";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > *": {
      margin: theme.spacing(1),
    },
    "form": {
        width: "100%",
    }
  },
  fullWidth: {
      width: "100%"
  },
  "button": {
    width: "20%"
  },
  textField: {
    margin: 8,
    width: "100%"
  },
  customGridBlock: {
    width: "33%",
    display: "inline-block"
  },
  customGrid: {
    width: "33%",
    display: "inline-grid"
  },
  w60: {
    width: "60%"
  },
  w40: {
    width: "40%"
  },
  atEnd: {
    textAlign: "end"
  },
  errorText: {
    color: "red",
    fontSize: 12
  },
  buttonContainer: {
    display: "flex",
    marginLeft: 20
  },
  w95: {
    width: "95%"
  },
  smallText: {
    fontSize: 12
  }
}));

export default function SearchArea(props) {
  const classes = useStyles();
  const [state, setState] = useState({text:"", startDate: "", endDate: ""});

  useEffect(() => {
    
  }, []);

  const isError = () => {
    if(state.startDate && state.endDate) {
      let flag =  moment(state.endDate).isAfter(state.startDate);
      if(flag) {
        return null;
      } else {
        return "End Date can not be lesser than Start Date";
      }
    } else {
      return null;
    }
  };

  const getSelectedLabel = (selected) => {
    let items = [];
    /* eslint-disable no-unused-vars */
    for(let i in selected) {
      const info = props.allowedFileters.find((x) => x.dataKey === selected[i]);
      items.push(info.label);
    }
    return items.join(", ");
  };

  return (
    <div className={classes.root}>
      
        <form  noValidate autoComplete="off"  onSubmit={(e) => {
          e.preventDefault();
          console.log(state);
          props.change(state);
        }}>
          <div className={classes.fullWidth}>
            <div className={classes.customGrid}>
              <FormControl className={classes.w95}>
                <TextField
                  id="datetime-local"
                  label="Start Date & Time"
                  type="datetime-local"
                  value={state.startDate}
                  className={classes.textField}
                  onChange={(data) => {
                    setState({
                      ...state,
                      startDate: data.target.value
                    });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </div>
            <div className={classes.customGrid}>
              <FormControl className={classes.w95}>
                <TextField
                  className={classes.textField}
                  id="datetime-local"
                  label="End Date & Time"
                  type="datetime-local"
                  value={state.endDate}
                  onChange={(data) => {
                    setState({
                      ...state,
                      endDate: data.target.value
                    });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <span className={classes.errorText}>{isError()}</span>
            </div>
            <div className={classes.customGridBlock}>
              <InputLabel id="demo-mutiple-name-label" className={classes.smallText}>Show/Hide Columns</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                className={classes.textField}
                onChange={(e) => {
                  props.onSelectChange(e.target.value);
                }}
                value={props.selectedColumn}
                renderValue={(selected) => {
                  return getSelectedLabel(selected);
                }}
                input={<Input />}
              >
                {props.allowedFileters.map((name) => (
                  <MenuItem key={name.dataKey} value={name.dataKey}>
                    <Checkbox checked={props.selectedColumn.indexOf(name.dataKey) === -1} />
                    {name.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          
          <div className={classes.fullWidth}>
            <FormControl className={classes.w60}>
              <div className={classes.fullWidth}>
                <TextField
                  id="standard-full-width"
                  className={classes.textField}
                  placeholder="Search"
                  onChange={(e) => setState({...state,text: e.target.value})}
                  value={state.text || ""}
                />
              </div>
            </FormControl>
            <FormControl className={`${classes.w40} ${classes.atEnd}`}>
              <div className={classes.buttonContainer}>
                <Button type="submit" variant="contained" color="primary">
                  Search
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="button" variant="contained" onClick={() => {
                  setState({text: "", startDate:"", endDate: ""});
                  props.resetFilter();
                }}>
                  Reset
                </Button>
              </div>
            </FormControl>
          </div>
        </form>
    </div>
  );
}

SearchArea.propTypes = {
  allowedFileters: PropTypes.array,
  change: PropTypes.func,
  onSelectChange: PropTypes.func,
  resetFilter: PropTypes.func,
  selectedColumn: PropTypes.any
};