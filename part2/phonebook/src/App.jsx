import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Phonebook from './services/Phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    Phonebook.getAll().then(persons => setPersons(persons))
  }, [])

  const handleNewNameOnChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberOnChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterOnChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        Phonebook.update(person.id, changedPerson).then(response => {
          setPersons(persons.map(p => p.id !== person.id ? p : response))
          setNewName('')
          setNewNumber('')
          setMessage({ type: 'success', text: `Updated ${newName}` })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(() => {
          setMessage({ type: 'error', text: `Information of ${newName} has already been removed from server` })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
      return
    }

    const newPerson = { name: newName, number: newNumber }
    Phonebook.create(newPerson).then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
      setMessage({ type: 'success', text: `Added ${newPerson.name}` })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      Phonebook.remove(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        setMessage({ type: 'success', text: `Deleted ${person.name}` })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterOnChange} />

      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNewNameOnChange} handleNumberChange={handleNewNumberOnChange} addPerson={addPerson} />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App