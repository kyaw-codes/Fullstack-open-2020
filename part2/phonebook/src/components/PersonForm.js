import React from 'react'

const PersonForm = ({ onNameChange, onNumberChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input onChange={onNameChange} />
    </div>
    <div>
      number: <input onChange={onNumberChange} />
    </div>
    <button type="submit">add</button>
  </form>
)

export default PersonForm
