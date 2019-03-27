import React, { Component } from "react";
import { Grid } from "./grid";
import { Caption } from "./caption";
import { RestartButton } from "./restart-button";
import { EMPTY, PLAYER1, PLAYER2, ROWS_NUMBER, COLUMNS_NUMBER, NUM_TO_WIN } from "../constants";
import "./app.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.getEmptyGrid = () => {
      // получает пустое поле с размерами, заданными в файле constants.js
      // эти размеры можно поменять и, например, запустить игру на поле 10х10

      const grid = [];
      for (let i = 0; i < COLUMNS_NUMBER; i++) {
        grid[i] = [];
        for (let j = 0; j < ROWS_NUMBER; j++) {
            grid[i].push(EMPTY);
          }
      }
      return grid;
    }

    this.state = {
      columns: this.getEmptyGrid(),
      isOddTurn: true,
      isVictory: false,
      isDraw: false,
    }

    this.getLines = this.getLines.bind(this);
    this.onTurn = this.onTurn.bind(this);
    this.hasWon = this.hasWon.bind(this);
    this.hasFilled = this.hasFilled.bind(this);
    this.restart = this.restart.bind(this);
    this.renderText = this.renderText.bind(this);
  }

  onTurn(columnIndex) {
    // проверяет, можно ли ходить, делает ход,
    // вызывает функции, вычисляющие победу или заполнение поля
    // и обновляет состояние

    if (this.state.isVictory || this.state.isDraw) {
      return;
    }
    
    const { columns, isOddTurn } = this.state;
    const rowIndex = columns[columnIndex].lastIndexOf(EMPTY);
    const sign = isOddTurn ? PLAYER1 : PLAYER2;

    if (rowIndex === -1) {
        return;
    } else {
        let newColumns = [];
        for (let i = 0; i < columns.length; i++) {
            newColumns[i] = [];
            for (let j = 0; j < columns[0].length; j++) {
              newColumns[i][j] = columns[i][j];
            }
        }
        newColumns[columnIndex][rowIndex] = sign;

        const isVictory = this.hasWon(this.getLines(newColumns), sign)
        const isFull = this.hasFilled(newColumns);

        this.setState((prevState) => {
          return {
            isOddTurn: !prevState.isOddTurn,
            columns: newColumns,
            isVictory: isVictory,
            isDraw: !isVictory && isFull,
          }
        })
    }
  };

  hasWon(lines, sign) {
    const combo = sign.repeat(NUM_TO_WIN) 
    // число фишек в ряд для победы также можно изменить в файле constants.js
    return lines.some((line) => {
        return line.join("").includes(combo);
    })
  }

  hasFilled(arr) {
    const lastRow = [];
    arr.forEach((column) => {
      lastRow.push(column[0]);
    });
    if (lastRow.indexOf(EMPTY) === -1) {
      return true;
    } else {
      return false;
    }
  }

  restart() {
    this.setState(
      {
        columns: this.getEmptyGrid(), 
        isOddTurn: true,
        isVictory: false,
        isDraw: false,
      }
    );
  }

  getLines(arr) {
    // получает все возможные для поля этого размера линии,
    // на которых может поместиться число фишек, достаточное для победы (NUM_TO_WIN)

    const lines = [];

    arr.forEach((column) => lines.push([...column]));

    for (let y = 0; y < arr[0].length; y++) {
        let newRow = [];
        for (let x = 0; x < arr.length; x++) {
            newRow.push(arr[x][y]);
        }
        lines.push(newRow);
    }
    for (let i = 0; i < arr.length - (NUM_TO_WIN - 1); i++) {
        let newDiagonal = [];
        for (let x = i, y = 0; x < arr.length && y < arr[0].length; x++, y++) {
            newDiagonal.push(arr[x][y]);
        };
        lines.push(newDiagonal);
    }
    for (let i = arr.length - 1; i >= (NUM_TO_WIN - 1); i--) {
        let newDiagonal = [];
        for (let x = i, y = 0; x >= 0 && y < arr[0].length; x--, y++) {
            newDiagonal.push(arr[x][y]);
        };
        lines.push(newDiagonal);
    }
    for (let i = 1; i < arr[0].length - (NUM_TO_WIN - 1); i++) {
        let newDiagonal = [];
        for (let x = 0, y = i; y < arr[0].length; x++, y++) {
            newDiagonal.push(arr[x][y]);
        };
        lines.push(newDiagonal);
    }
    for (let i = 1; i < arr[0].length - (NUM_TO_WIN - 1); i++) {
        let newDiagonal = [];
        for (let x = arr.length - 1, y = i; y < arr[0].length; x--, y++) {
            newDiagonal.push(arr[x][y]);
        };
        lines.push(newDiagonal);
    }

    return lines;
  }

  renderText(isOddTurn, isVictory, isDraw) {
    if (isDraw) {
      return "Ничья!"
    }
    if (isVictory) {
      if (isOddTurn) {
        return "Победил синий игрок!";
      } else {
        return "Победил красный игрок!";
      }
    } else {
      if (isOddTurn) {
        return "Ходит красный игрок";
      } else {
        return "Ходит синий игрок";
      }
    }
  }

  render() {

    const { columns, isOddTurn, isVictory, isDraw } = this.state;
    const gameOver = isVictory || isDraw;

    return (
      <div className="App">
        <Grid columns={columns} onClick={this.onTurn} />
        <Caption>
          { this.renderText(isOddTurn, isVictory, isDraw) }
        </Caption>
        <RestartButton onClick={this.restart} gameOver={gameOver} />
      </div>
    );
  }

}

export default App;