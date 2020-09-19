import React, { useState, useEffect } from "react"
import Axios from 'axios'
import { create, remove, update, findPersonByName } from "./service/PhonebookService";
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successNoti, setSuccessNoti] = useState("")
  const [errorNoti, setErrorNoti] = useState("")

  useEffect(() => {
    Axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data))
  }, [])

  const personsToShow =
    filter.length > 0
      ? persons.filter((person) =>
          person.name.toLocaleLowerCase().includes(filter.toLowerCase())
        )
      : persons

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!persons.map((p) => p.name).includes(newName)) {
      // Add new data to phone book
      create({ name: newName, number: newNumber }).then(res => setPersons(persons.concat(res)))
      setSuccessNoti(`Added ${newName}`)
      setTimeout(() => setSuccessNoti(null), 3000)
    } else {
      // Ask user to confirm that the name is already exist so he can override the old number   
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        // Search the person object and then update it
        findPersonByName(newName)
          .then(old => update(old.id, { ...old, number: newNumber }))
        setSuccessNoti(`Changed ${newName}'s number`);
        setTimeout(() => setSuccessNoti(null), 3000);
        setPersons(persons.filter(p => p.name === newName ? p.number = newNumber : p))
      }
    }
    
  }

  const handleNewName = (event) => setNewName(event.target.value);

  const handleNewNumber = (event) => setNewNumber(event.target.value);

  const handleFilter = (event) => setFilter(event.target.value);

  const handleDelete = (id, name) => {
    const confirmation = window.confirm(`Delete ${name} ?`)
    if (confirmation) {
      remove(id).catch(() => {
        setErrorNoti(`Information of ${name} has already been removed from server`)
        setTimeout(() => setErrorNoti(null), 3000)
      })
      setPersons(persons.filter((p) => p.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successNoti} />
      <ErrorNotification message={errorNoti} />
      <Filter onChange={handleFilter} />
      <h2>add new</h2>
      <PersonForm
        onNameChange={handleNewName}
        onNumberChange={handleNewNumber}
        onSubmit={handleFormSubmit}
      />

      <h2>Numbers</h2>
      <PersonList persons={personsToShow} onDelete={handleDelete} />
    </div>
  );
};

export default App;
