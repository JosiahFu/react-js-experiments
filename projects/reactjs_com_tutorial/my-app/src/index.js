import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onSquareClick(i)}
    />;
  }

  render() {
    const winner = calculateWinner(this.props.squares);
    let status;
    if (winner === null)
      status = 'Next player: ' + this.props.turn;
    else
      status = 'Winner: ' + winner;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        history: [Array(9).fill(null)],
        turn: 'X',
    };
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) === null && squares[i] === null) return;
    squares[i] = this.props.turn;
    this.setState({history: [...this.state.history, this.state.squares.slice()], squares: squares});
    if (this.props.turn === 'O')
      this.setState({turn: 'X'});
    else
      this.setState({turn: 'O'});
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board onsquareclick={this.handleClick}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
