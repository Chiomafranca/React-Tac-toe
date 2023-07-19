import React, { useState } from 'react';
import './App.css';

const TicTac = () => {
  const [turn, setTurn] = useState('X');
  const [cells, setCells] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState(null);

  const handleWinningCondition = (squares) => {
    const combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6]
      ]
    };

    for (let combo in combos) {
      combos[combo].forEach(patterns => {
        if (
          squares[patterns[0]] !== '' &&
          squares[patterns[0]] === squares[patterns[1]] &&
          squares[patterns[0]] === squares[patterns[2]]
        ) {
          setWinner(squares[patterns[0]]);
        }
      });
    }
  };

  const handleClick = (num) => {
    let square = [...cells];

    if (square[num] !== '') {
      alert('Already clicked!');
      return;
    }

    square[num] = turn;
    setCells(square);

    handleWinningCondition(square);

    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const handleRestart =() =>{
       setWinner(null)
       setCells(Array(9).fill(''))
  }

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe in react</h1>
      <table>
        <caption>Turn: {turn}</caption>
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {winner && (
        <>
          <p>{winner} is the winner</p>
          <button onClick={() =>handleRestart()}>Play again</button>
        </>
      )}
    </div>
  );
};
export default TicTac;
