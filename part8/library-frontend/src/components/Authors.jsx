import SetBirthyear from "./SetBirthyear"

const Authors = ({ authors, token }) => {
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        token && <SetBirthyear authors={authors} />
      }
    </div>
  )
}

export default Authors
