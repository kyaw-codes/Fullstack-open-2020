import React from 'react'
import Person from './Person'

const PersonList = ({ persons, onDelete }) => {
  return persons.map((person) => (
    <Person key={person.name} person={person} onDelete={onDelete} />
  ));
}

export default PersonList