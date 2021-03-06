import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Icon, Label, Menu, Table, Button } from "semantic-ui-react";
import PlayGame from "./PlayGame";
import axios from "axios";

const renderSquare = (square, props) => {
  let returnValue;
  switch (square.coefficient) {
    case 0:
      returnValue = <div {...props}>{square.letter.toUpperCase()}</div>;
    case 1:
      returnValue = <div {...props}>{square.letter.toUpperCase()}</div>;
    case 2:
      returnValue = <div {...props}>{square.letter.toUpperCase()}</div>;
    case 3:
      returnValue = <div {...props}>{square.letter.toUpperCase()}</div>;
    default:
      returnValue = <div {...props}>{square.letter.toUpperCase()}</div>;
  }
  return <>{returnValue}</>;
};
class square {
  constructor(x, y) {
    this.coefficient = 1;
    this.empty = true;
    this.letter = "_";
    this.x = x;
    this.y = y;
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: null,
      startPoint: { x: 0, y: 0 },
      player: true,
      turn: props.host ? true : false,
      gameStarted: false,
      name: props.name,
    };
    props.socket.on("sendWinCon", (winCon) => {
      this.setState({ winCon });
    });
  }

  shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }

  fillValues = (prevRows, values) => {
    const rows = prevRows;
    const emptySquares = [];
    rows.forEach((row) =>
      row.forEach((square) => {
        if (square.empty) {
          emptySquares.push(square);
        }
      })
    );

    this.shuffle(emptySquares)
      .slice(0, values.length)
      .forEach((square, index) => {
        rows[square.x][square.y].coefficient = values[index];
      });
    return rows;
  };

  initializeRows = (wordList) => {
    const { sizeX, sizeY } = this.props;
    let rows = [];
    for (let i = 0; i < sizeX; i++) {
      const row = [];
      for (let k = 0; k < sizeY; k++) {
        row.push(new square(i, k));
      }
      rows.push(row);
    }
    rows = this.putFirstWord(rows, wordList);
    const { coefficientRatios } = this.props;
    const valuesToEnter = [];
    for (let i = 0; i < coefficientRatios[0]; i++) {
      valuesToEnter.push(0);
    }
    for (let i = 0; i < coefficientRatios[1]; i++) {
      valuesToEnter.push(2);
    }
    for (let i = 0; i < coefficientRatios[2]; i++) {
      valuesToEnter.push(3);
    }
    let newRows = this.fillValues(rows, valuesToEnter);
    if (this.state.turn) {
      this.setState({ rows: newRows });
    }
    this.props.socket.emit("changeRows", newRows);
  };

  componentDidMount() {
    const { ip, port, socket } = this.props;
    console.log(this.state.turn);
    axios.get(`http://${ip}:${port}/getWords`).then(({ data: wordList }) => {
      this.setState({ wordList });

      if (this.props.host) {
        this.initializeRows(wordList);
      }
    });
    socket.on("newRows", ({ rows, clientCounter, myClientList }) => {
      console.log({ rows });
      console.log(myClientList);
      console.log(clientCounter % myClientList.length);
      console.log(clientCounter);
      if (
        myClientList[clientCounter % myClientList.length] == this.props.name
      ) {
        this.setState({ turn: true });
      } else {
        this.setState({ turn: false });
      }
      if (myClientList[clientCounter] != name) {
        this.setState({ rows });
      }
    });

    socket.on("finishGame", ({ name, points }) => {
      alert(`${name} Won the game with ${points} points.`);
      console.log({ name, points });
    });
  }

  generateProps = (square, i, rowLength) => {
    const { startPoint } = this.state;
    const { x, y } = startPoint;
    return {
      style: {
        marginBottom: "4px",
        marginTop: "0px",
        marginRight: "10px",
        marginLeft: "5px",
        float: "left",
      },
    };
  };

  putFirstWord = (rows, wordList) => {
    const word = wordList[Math.floor(Math.random() * 3000)];
    const { sizeX, sizeY } = this.props;
    const vertical = Math.random() >= 0.5;
    if (vertical) {
      const x = Math.floor(Math.random() * (sizeX - 1));
      const y = Math.floor(Math.random() * (sizeY - word.length - 1));
      const startPoint = { x, y };
      for (let i = 0; i < word.length; i++) {
        rows[startPoint.x][startPoint.y + i].letter = word.charAt(i);
        rows[startPoint.x][startPoint.y + i].empty = false;
      }
    } else if (!vertical) {
      const x = Math.floor(Math.random() * (sizeX - word.length - 1));
      const y = Math.floor(Math.random() * (sizeY - 1));
      const startPoint = { x, y };
      for (let i = 0; i < word.length; i++) {
        rows[startPoint.x + i][startPoint.y].letter = word.charAt(i);
        rows[startPoint.x + i][startPoint.y].empty = false;
      }
    }
    return rows;
  };

  checkWordAndGetPoint = async (vertical, word, included) => {
    const { name } = this.state;
    this.setState({ turn: false });
    return new Promise((resolve, rej) => {
      const { startPoint, rows, wordList } = this.state;

      const getSquares = async () => {
        return Promise.all(
          Array.from(word).map((char, i) => {
            const square =
              rows[startPoint.x + (!vertical ? 0 : i)][
                startPoint.y + (vertical ? 0 : i)
              ];
            return square;
          })
        );
      };

      if (!included) {
        resolve(0, rows, name);
      } else {
        getSquares().then(async (squares) => {
          const blackSquares = squares.filter(
            (square) => square.coefficient == 0
          );
          const newLetterSquares = squares.filter(
            (square) => square.letter == "_"
          );
          const filledSquares = squares.filter((square) => !square.empty);
          const unmatchedSquares = squares.filter(
            (square, i) => square.letter != "_" && square.letter != word[i]
          );
          const coefficientPoints = newLetterSquares.reduce(
            async (multipliedPoints, square) => {
              const multipliedPointResult = await multipliedPoints;
              return multipliedPointResult * square.coefficient;
            },
            1
          );
          if (
            newLetterSquares.length < 1 ||
            unmatchedSquares.length + blackSquares.length > 0 ||
            filledSquares.length < 1
          ) {
            resolve(0, rows, name);
          } else {
            squares.forEach((square, i) => {
              const newSquare = square;
              square.letter = word[i];
              square.empty = false;
              rows[square.x][square.y] = newSquare;
            });
            this.setState({ rows });

            coefficientPoints.then((points) => {
              resolve({ point: points * newLetterSquares.length, rows, name });
            });
          }
        });
      }
    });
  };

  generateRow = (row, rowIndex) => {
    return row.map((square, i) => (
      <Table.Cell
        id={"x" + square.x + "y" + square.y}
        style={{
          outlineStyle: "initial",
          backgroundColor:
            square.coefficient == 2
              ? "yellow"
              : square.coefficient == 3
              ? "lime"
              : square.coefficient == 0
              ? "black"
              : "white",
        }}
        key={rowIndex + i}
        onClick={() => {
          const { startPoint } = this.state;
          document.getElementById(
            "x" + startPoint.x + "y" + startPoint.y
          ).style.outlineStyle = "initial";
          document.getElementById(
            "x" + square.x + "y" + square.y
          ).style.outlineStyle = "inset";
          this.setState({ startPoint: { x: rowIndex, y: i } });
          console.log({ startPoint: { x: rowIndex, y: i } });
          console.log(square);
        }}
      >
        {renderSquare(square, this.generateProps(square, i, row.length))}
      </Table.Cell>
    ));
  };

  render() {
    const { rows, gameStarted, turn } = this.state;

    return (
      <>
        <Table celled>
          <Table.Body>
            {rows
              ? rows.map((row, i) => (
                  <Table.Row key={i}>{this.generateRow(row, i)}</Table.Row>
                ))
              : null}
          </Table.Body>
        </Table>
        <PlayGame
          ip={this.props.ip}
          winCon={this.state.winCon || this.props.winCon}
          turn={turn}
          socket={this.props.socket}
          name={this.props.name}
          clientCounter={this.state.clientCounter}
          myClientList={this.state.myClientList}
          checkWord={this.checkWordAndGetPoint}
        />
      </>
    );
  }
}

export default Board;
