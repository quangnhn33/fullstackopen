import { useQuery } from "@apollo/client"
import { GET_USER, ALL_BOOKS } from "../queries"
import { gql } from '@apollo/client'
import { useState, useEffect } from "react"

const BOOKS_BY_GENRE = gql`
query allBooks($genre: String!) {
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
  }
}
`

const Recommendation = ({ show, favoriteGenre }) => {
  const resultBooks = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre }
  })
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (resultBooks.data) {
      setBooks(resultBooks.data.allBooks)
    }
  }, [resultBooks])

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>{favoriteGenre}</b>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recommendation