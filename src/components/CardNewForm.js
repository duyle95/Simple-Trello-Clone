import React from "react";

import { connect } from "react-redux";
import { addNewCard } from "../actions";
import getRandomId from "../utils/getRandomId";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const cardStyles = theme => ({
  textField: {
    marginLeft: 5,
    marginRight: 5,
    width: 150
  },
  card: {
    border: "1px solid lightgreen",
    borderRadius: 5,
    margin: 5
  },
  button: {
    margin: "0 auto",
    display: "block"
  }
});

class CardNewForm extends React.PureComponent {
  state = { isCreating: false, errorText: "" };

  onCreate = () => {
    this.setState({ isCreating: true });
  };

  onCreateCard = e => {
    e.preventDefault();
    if (this.title.value.length === 0) {
      this.setState({ errorText: "Give me a name !!!" });
      return false;
    }

    const newCard = {
      id: `card_${getRandomId()}`,
      title: this.title.value,
      listId: this.props.listId
    };
    this.props.addNewCard(newCard);
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
        <CardContent className={classes.card} onClick={this.onCreate}>
          <Typography component="p">
            <strong>+</strong> Add a card
          </Typography>
        </CardContent>
      );
    } else {
      return (
        <CardContent className={classes.card}>
          <form onSubmit={this.onCreateCard}>
            <TextField
              className={classes.textField}
              margin="normal"
              helperText={this.state.errorText}
              error={this.state.errorText.length === 0 ? false : true}
              inputRef={input => (this.title = input)}
            />
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.onCancel}
            >
              Cancel
            </Button>
          </form>
        </CardContent>
      );
    }
  }
}

CardNewForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { addNewCard }
)(withStyles(cardStyles)(CardNewForm));
