import { useState, useEffect } from "react";
import { LOGIN } from "../queries";
import { useMutation } from '@apollo/client'


const LoginForm = ({ setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      setPage('authors')
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])


  const submitForm = (e) => {
    e.preventDefault();
    login({ variables: { username, password } })

    console.log('logging in...')
    console.log(username, password)
  }
  return (
    <div>
      <form onSubmit={submitForm}>
        <div>
          username<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
