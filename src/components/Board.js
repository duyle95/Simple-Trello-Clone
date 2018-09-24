import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const boardStyles = {
  card: {
    minWidth: 275,
    textAlign: "center",
    display: "inline-block",
    margin: 20,
    verticalAlign: "top"
  },
  title: {
    fontSize: 25
  }
};

const Board = ({ board, history, setActiveBoard, classes }) => {
  const onBoardClick = () => {
    setActiveBoard(board);
    history.push(`/${board.id}`);
  };

  return (
    <Card className={classes.card} onClick={onBoardClick}>
      <CardContent>
        <Typography className={classes.title}>{board.title}</Typography>
      </CardContent>
    </Card>
  );
};

Board.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(boardStyles)(Board));
