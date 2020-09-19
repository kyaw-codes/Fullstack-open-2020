import React from "react"

const Header = ({ text }) => (
  <div>
    <h3>{text}</h3>
  </div>
);

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((p) =>
        <Part key={p.id} part={p} />
      )}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts
    .map((p) => p.exercises)
    .reduce((accumulator, current) => accumulator + current);

  return <b>total of {total} exercises</b>;
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((c) => (
        <div key={c.id}>
          <Header text={c.name} />
          <Content parts={c.parts} />
          <Total parts={c.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course
