import React from "react";
import { connect } from "react-redux";
import { addNewList } from "../actions";
import getRandomId from "../utils/getRandomId";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

const listStyles = theme => ({
  list: {
    // height: "100%",
    minWidth: 275,
    maxWidth: 275,
    display: "inline-block",
    margin: 20,
    verticalAlign: "top",
    textAlign: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class ListNewForm extends React.PureComponent {
  state = { errorText: "" };

  onCreate = () => {
    this.setState({ isCreating: true });
  };

  onCreateList = e => {
    e.preventDefault();
    if (this.title.value.length === 0) {
      this.setState({ errorText: "Give me a name !!!" });
      return false;
    }

    const newList = {
      id: `list_${getRandomId()}`,
      title: this.title.value,
      cards: []
    };
    this.props.addNewList(newList);
    this.setState({ errorText: "" });
    this.title.value = "";
  };
  // NOTE: find another way to conditional rendering but don't have to write Card container twice
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.list}>
        <form onSubmit={this.onCreateList}>
          <CardContent>
            <TextField
              className={classes.textField}
              margin="normal"
              helperText={this.state.errorText}
              error={this.state.errorText.length === 0 ? false : true}
              inputRef={input => (this.title = input)}
            />
          </CardContent>
        </form>
      </Card>
    );
  }
}

ListNewForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { addNewList }
)(withStyles(listStyles)(ListNewForm));
