import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";
import Select from 'react-select';

const SetBirthyear = ({ authors }) => {
  const [born, setBorn] = useState("")
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    }
  })
  const [name, setName] = useState(null);
  const options = authors.map(a => ({ value: a.name, label: a.name }))

  const setBirthyear = (e) => {
    e.preventDefault()
    editAuthor({ variables: { name: name.value, setBornTo: parseInt(born) } })
    setBorn("")
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={setBirthyear}>
        <Select
          defaultValue={name}
          onChange={setName}
          options={options}
        />
        <div>born<input value={born} onChange={(e) => setBorn(e.target.value)} type="number" /></div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear