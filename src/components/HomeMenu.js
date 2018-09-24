import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";

const homeMenuStyles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
    color: "black"
  }
};

const HomeMenu = ({ classes }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link className={classes.flex} to="/">
            Home
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

HomeMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(homeMenuStyles)(HomeMenu);
