import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const cardStyles = {
  card: {
    backgroundColor: "lightblue",
    border: "1px solid lightgreen",
    borderRadius: 5,
    margin: 5
  }
};

const Card = ({ card, onDragStart, classes }) => {
  return (
    <CardContent
      className={classes.card}
      draggable
      onDragStart={e =>
        onDragStart(e, JSON.stringify({ draggedEl: "card", card }))
      }
    >
      <Typography component="p">{card.title}</Typography>
    </CardContent>
  );
};

Card.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(cardStyles)(Card);
