import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>
);

const Part = (props) => {
  const info = props.info;

  return (
    <div>
      {info.name} {info.exercises}
    </div>
  );
};

const Content = (props) => {
  const parts = props.parts;

  return (
    <div>
      <Part info={parts[0]} />
      <Part info={parts[1]} />
      <Part info={parts[2]} />
    </div>
  );
};

const Total = (props) => {
  const parts = props.parts;
  let total = 0;

  parts.forEach(part => total += part.exercises)

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
