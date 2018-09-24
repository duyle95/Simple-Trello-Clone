import React from "react";
import { connect } from "react-redux";

import { setActiveBoard } from "../actions";
import BoardNewForm from "../components/BoardNewForm";
import Board from "../components/Board";

class Dashboard extends React.PureComponent {
  state = { boards: {} };

  renderBoards = boards => {
    return Object.keys(boards).map(boardId => (
      <Board
        key={boards[boardId].id}
        board={boards[boardId]}
        setActiveBoard={this.props.setActiveBoard}
      />
    ));
  };

  render() {
    return (
      <div>
        <BoardNewForm />
        {this.renderBoards(this.props.boards)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards
  };
};

export default connect(
  mapStateToProps,
  { setActiveBoard }
)(Dashboard);
