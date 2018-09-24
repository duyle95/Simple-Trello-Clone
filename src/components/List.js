import React from "react";
import PropTypes from "prop-types";
import CardNewForm from "./CardNewForm";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";

const listStyles = theme => ({
  list: {
    // height: "100%",
    minWidth: 275,
    maxWidth: 275,
    display: "inline-block",
    margin: 20,
    verticalAlign: "top",
    textAlign: "center"
  }
});

const List = ({
  list,
  children,
  onDragOver,
  onDrop,
  onDragStartList,
  onDropList,
  classes
}) => {
  return (
    <Card
      className={classes.list}
      onDragOver={e => onDragOver(e)}
      onDrop={e => onDrop(e, list.id)}
    >
      <CardContent
        draggable
        onDragStart={e =>
          onDragStartList(e, JSON.stringify({ list, draggedEl: "list" }))
        }
        onDragOver={e => onDragOver(e)}
        onDrop={e => onDropList(e, list.id)}
      >
        <CardHeader title={list.title} />
        <Divider />
        {children}
        <CardNewForm listId={list.id} />
      </CardContent>
    </Card>
  );
};

List.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(listStyles)(List);
