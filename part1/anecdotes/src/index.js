import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState([0, 0, 0, 0, 0, 0])

  const maxVotedIndex = points.indexOf(Math.max(...points));

  const generateRandAnecdote = () => {
    const index = Math.round(Math.random() * 5)
    setSelected(index)
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoint(copy)
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <div>{props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={generateRandAnecdote}>next anecdote</button>
      <h3>Anecdote with most votes</h3>
      <div>{anecdotes[maxVotedIndex]}</div>    
      <div>has {points[maxVotedIndex]} votes</div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));