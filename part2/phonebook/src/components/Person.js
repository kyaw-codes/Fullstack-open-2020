import React from 'react'

const Person = ({ person, onDelete }) => (
  <div>
    {person.name} {person.number}{" "}
    <button onClick={() => onDelete(person.id, person.name)}>delete</button>
  </div>
)

export default Person