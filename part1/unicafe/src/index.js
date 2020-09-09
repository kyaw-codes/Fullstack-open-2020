import React, { useState } from "react";
import ReactDOM from "react-dom";

const Title = ({ text }) => <h3>{text}</h3>

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good || neutral || bad ? good + neutral + bad : 0;
  const average =
    good || neutral || bad
      ? (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)
      : 0;
  const positive = good ? (good / all) * 100 : 0;

  return good || neutral || bad ? (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive + "%"} />
        </tbody>
      </table>
    </div>
  ) : (
    <p>No feedback given</p>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const clickGood = () => {
    setGood(good + 1);
  };

  const clickNeutral = () => {
    setNeutral(neutral + 1);
  };
  const clickBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Title text="give feedback" />
      <Button text="good" onClick={clickGood} />
      <Button text="neutral" onClick={clickNeutral} />
      <Button text="bad" onClick={clickBad} />
      <Title text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
