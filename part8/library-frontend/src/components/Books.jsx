import { useState, useEffect } from "react"
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"

const Books = () => {
  const [booksToShow, setBooksToShow] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [uniqueGenres, setUniqueGenres] = useState([])
  const books = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (books.data) {
      setBooksToShow(books.data.allBooks)
      const genres = books.data.allBooks.map(b => b.genres).flat()
      setUniqueGenres([...new Set(genres)])
    }
  }, [books])

  const selectGenre = (event) => {
    setSelectedGenre(event.target.value)
    if (event.target.value === "all") {
      setBooksToShow(books.data.allBooks)
    } else {
      setBooksToShow(books.data.allBooks.filter(b => b.genres.includes(event.target.value)))
    }
  }


  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{selectedGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button value="all" onClick={selectGenre}>all</button>
        {uniqueGenres.map(g => <button value={g} onClick={selectGenre} key={g}>{g}</button>)}
      </div>
    </div>
  )
}

export default Books
