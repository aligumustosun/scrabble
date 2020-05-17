import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Icon, Label, Menu, Table } from "semantic-ui-react";
import PlayGame from "./PlayGame";

class square {
  constructor(x, y) {
    this.coefficient = 1;
    this.empty = true;
    this.letter = "_";
    this.x = x;
    this.y = y;
  }
  render(props) {
    let returnValue;
    switch (this.coefficient) {
      case 0:
        returnValue = <div {...props}>{this.letter.toUpperCase()}</div>;
      case 1:
        returnValue = <div {...props}>{this.letter.toUpperCase()}</div>;
      case 2:
        returnValue = <div {...props}>{this.letter.toUpperCase()}</div>;
      case 3:
        returnValue = <div {...props}>{this.letter.toUpperCase()}</div>;
      default:
        returnValue = <div {...props}>{this.letter.toUpperCase()}</div>;
    }
    return <>{returnValue}</>;
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: null,
      startPoint: { x: 0, y: 0 },
      player: true,
      host: true,
    };
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
      }),
    );

    this.shuffle(emptySquares)
      .slice(0, values.length)
      .forEach((square, index) => {
        rows[square.x][square.y].coefficient = values[index];
      });
    return rows;
  };

  initializeRows = () => {
    const { sizeX, sizeY } = this.props;
    let rows = [];
    for (let i = 0; i < sizeX; i++) {
      const row = [];
      for (let k = 0; k < sizeY; k++) {
        row.push(new square(i, k));
      }
      rows.push(row);
    }
    rows = this.putFirstWord(rows, "ali");
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
    this.setState({ rows: newRows });
  };

  componentDidMount() {
    this.initializeRows();
    console.log(this.props);
  }

  generateProps = (square, i, rowLength) => {
    const { startPoint } = this.state;
    const { x, y } = startPoint;
    let backgroundColor = "white";
    switch (square.coefficient) {
      case 0:
        backgroundColor = "black";
        break;
      case 1:
        backgroundColor = "white";
        break;
      case 2:
        backgroundColor = "yellow";
        break;
      case 3:
        backgroundColor = "green";
        break;
    }
    if (square.x == x && square.y == y) {
      backgroundColor = "gray";
    }
    return {
      style: {
        marginBottom: "4px",
        marginTop: "0px",
        marginRight: "10px",
        marginLeft: "5px",
        float: "left",
        backgroundColor,
      },
    };
  };

  putFirstWord = (rows, word) => {
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

  wordList = ["sa", "as", "aligt", "guys"];

  checkWordAndGetPoint = (vertical, word) => {
    const { startPoint, rows } = this.state;
    if (!this.wordList.includes(word)) {
      return 0;
    }
    const getSquares = async () => {
      return Promise.all(
        Array.from(word).map((char, i) => {
          const square =
            rows[startPoint.x + (!vertical ? 0 : i)][
              startPoint.y + (vertical ? 0 : i)
            ];
          return square;
        }),
      );
    };

    getSquares().then(async (squares) => {
      const blackSquares = squares.filter((square) => square.coefficient == 0);
      const newLetterSquares = squares.filter((square) => square.letter == "_");
      const filledSquares = squares.filter((square) => !square.empty);
      const unmatchedSquares = squares.filter(
        (square, i) => square.letter != "_" && square.letter != word[i],
      );
      const coefficientPoints = newLetterSquares.reduce(async (multipliedPoints, square) => 
      {
        const multipliedPointResult = await multipliedPoints;
        console.log({ multipliedPointResult, newLetterSquares})
        return multipliedPointResult * newLetterSquares.length;
      }, 1);
      if (
        newLetterSquares.length < 1 ||
        unmatchedSquares.length + blackSquares.length > 0 ||
        filledSquares.length < 1
      ) {
        return 0;
      } else {
        squares.forEach((square, i) => {
          const newSquare = square;
          square.letter = word[i];
          square.empty = false;
          rows[square.x][square.y] = newSquare;
        });
        this.setState({ rows });

        coefficientPoints.then(points => {
          console.log(points)
          return points; 
        }) 
      }
    });
  };

  generateRow = (row, rowIndex) => {
    return row.map((square, i) => (
      <Table.Cell
        key={rowIndex + i}
        onClick={() => {
          this.setState({ startPoint: { x: rowIndex, y: i } });
          console.log({ startPoint: { x: rowIndex, y: i } });
        }}
      >
        {square.render(this.generateProps(square, i, row.length))}
      </Table.Cell>
    ));
  };

  render() {
    const { rows } = this.state;

    return (
      <>
        <Table>
          <Table.Body>
            {rows
              ? rows.map((row, i) => (
                  <Table.Row key={i}>{this.generateRow(row, i)}</Table.Row>
                ))
              : null}
          </Table.Body>
        </Table>
        {this.state.player ? (
          <PlayGame checkWord={this.checkWordAndGetPoint} />
        ) : null}
      </>
    );
  }
}

export default Board;
