import React from "react";
import { connect } from "react-redux";
import { addNewBoard } from "../actions";
import getRandomId from "../utils/getRandomId";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const boardNewFormStyles = theme => ({
  card: {
    minWidth: 275,
    display: "inline-block",
    margin: 20,
    textAlign: "center"
  },
  title: {
    fontSize: 25
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class BoardNewForm extends React.PureComponent {
  state = { isCreating: false, errorText: "" };

  onCreate = () => {
    this.setState({ isCreating: true });
  };

  onCreateBoard = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (this.title.value.length === 0) {
      this.setState({ errorText: "Give me a name !!!" });
      return false;
    }

    const newBoard = {
      id: `board_${getRandomId()}`,
      title: this.title.value,
      data: {}
    };
    this.props.addNewBoard(newBoard);
    this.setState({ isCreating: false });
    this.title.value = "";
  };

  onCancel = () => {
    this.setState({ isCreating: false, errorText: '' });
  };

  render() {
    const { classes } = this.props;

    if (!this.state.isCreating) {
      return (
        <Card className={classes.card} onClick={() => this.onCreate()}>
          <CardContent>
            <Typography className={classes.title}>
              <strong>+</strong> Add a board
            </Typography>
          </CardContent>
        </Card>
      );
    } else {
      return (
        <Card className={classes.card}>
          <form onSubmit={this.onCreateBoard}>
            <CardContent>
              <TextField
                label="title"
                className={classes.textField}
                margin="normal"
                helperText={this.state.errorText}
                error={this.state.errorText.length === 0 ? false : true}
                inputRef={input => (this.title = input)}
              />
            </CardContent>
          </form>
          <CardContent>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.onCreateBoard}
            >
              Create
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.onCancel}
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      );
    }
  }
}

BoardNewForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { addNewBoard }
)(withStyles(boardNewFormStyles)(BoardNewForm));
