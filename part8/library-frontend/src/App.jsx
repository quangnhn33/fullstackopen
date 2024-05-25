import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery, useSubscription } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, GET_USER } from "./queries"
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client"
import Recommendation from "./components/Recommendation";

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("library-user-token"))
  const [user, setUser] = useState(null)

  const resultAllAuthors = useQuery(ALL_AUTHORS)
  const resultAllBooks = useQuery(ALL_BOOKS)
  const resultUser = useQuery(GET_USER)

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      window.alert(`New book by ${addedBook.author.name} added: ${addedBook.title}`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })

  useEffect(() => {
    if (resultUser.data) {
      setUser(resultUser.data.me)
    }
  }, [resultUser])


  const logout = () => {
    setToken(null)
    setPage("authors")
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {
          token &&
          <div style={{ display: "inline-block" }}>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </div>
        }
        {
          !token && <button onClick={() => setPage("login")}>login</button>
        }
      </div>
      {
        page === "authors" && <Authors token={token} authors={resultAllAuthors.loading ? [] : resultAllAuthors.data.allAuthors} />
      }
      {
        page === "books" && <Books books={resultAllBooks.loading ? [] : resultAllBooks.data.allBooks} />
      }
      {
        page === "add" && <NewBook />
      }
      {
        page === "login" && <LoginForm setToken={setToken} setPage={setPage} />
      }
      {
        page === "recommend" && user && <Recommendation favoriteGenre={user.favoriteGenre} books={resultAllBooks.loading ? [] : resultAllBooks.data.allBooks} />
      }
    </div>
  );
};

export default App;
