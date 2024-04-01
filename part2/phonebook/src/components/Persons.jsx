const Persons = ({ persons, filter, handleDelete }) => {
    const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            {personsToShow.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></p>)}
        </div>
    )
}

export default Persons