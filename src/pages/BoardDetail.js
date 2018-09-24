import React from "react";
import { connect } from "react-redux";

import { updateBoards, setActiveBoard, editActiveBoard } from "../actions";

import ListNewForm from "../components/ListNewForm";
import List from "../components/List";
import Card from "../components/Card";

class BoardDetail extends React.Component {
  componentDidUpdate() {
    this.props.updateBoards(this.props.activeBoard);
  }

  // list drag, use card's onDrop()

  onDragStartList = (e, draggedEl) => {
    e.dataTransfer.setData("draggedEl", draggedEl);
  };

  onDropList = (e, toListId) => {
    let { draggedEl, list } = JSON.parse(e.dataTransfer.getData("draggedEl"));

    if (draggedEl === "card") {
      return false;
    }

    const newKeys = Object.keys(this.props.activeBoard.data).map(key => {
      if (key === toListId) {
        key = list.id;
      } else if (key === list.id) {
        key = toListId;
      }
      return key;
    });

    const newData = {};
    newKeys.forEach(key => {
      newData[key] = this.props.activeBoard.data[key];
    });
    const newBoard = {
      ...this.props.activeBoard,
      data: newData
    };
    this.props.editActiveBoard(newBoard);
  };


  // card drag
  onDragStart = (e, draggedEl) => {
    e.stopPropagation();
    e.dataTransfer.setData("draggedEl", draggedEl);
  };

  onDragOver = e => e.preventDefault();

  onDrop = async (e, toListId) => {
    let { draggedEl, card } = JSON.parse(e.dataTransfer.getData("draggedEl"));
    if (draggedEl === "list") {
      return false;
    }

    let newCards, oldCards;

    if (card.listId !== toListId) {
      newCards = this.props.activeBoard.data[toListId].cards.concat({
        ...card,
        ...{ listId: toListId }
      });
      oldCards = this.props.activeBoard.data[card.listId].cards.filter(c => {
        return c.id !== card.id;
      });
    } else {
      return true;
    }

    const newBoard = {
      ...this.props.activeBoard,
      data: {
        ...this.props.activeBoard.data,
        ...{
          [card.listId]: {
            ...this.props.activeBoard.data[card.listId],
            ...{ cards: oldCards }
          },
          [toListId]: {
            ...this.props.activeBoard.data[toListId],
            ...{ cards: newCards }
          }
        }
      }
    };
      
    this.props.editActiveBoard(newBoard);
  };

  renderList(data) {
    return Object.keys(data).map(key => {
      const cards = data[key].cards.map(card => (
        <Card key={card.id} card={card} onDragStart={this.onDragStart} />
      ));
      return (
        <List
          key={data[key].id}
          list={data[key]}
          cards={data[key].cards}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
          onDragStartList={this.onDragStartList}
          onDropList={this.onDropList}
        >
          {cards}
        </List>
      );
    });
  }
  render() {
    if (this.props.activeBoard) {
      return (
        <div>
          <h3 style={{ margin: "10px" }}>{this.props.activeBoard.title}</h3>
          <div className="board">
            {this.renderList(this.props.activeBoard.data)}
            <ListNewForm />
          </div>
        </div>
      );
    } else {
      return <div>Something wrong!!</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    activeBoard: state.activeBoard
  };
};

export default connect(
  mapStateToProps,
  { updateBoards, setActiveBoard, editActiveBoard }
)(BoardDetail);
