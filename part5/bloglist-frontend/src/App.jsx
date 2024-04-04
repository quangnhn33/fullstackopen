import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    if (user) {
      setUser(user)
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        return b.likes - a.likes
      })
      setBlogs(blogs)
    }
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
    } catch (exception) {
      setMessage({
        type: 'error',
        text: 'wrong username or password'
      })
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <LoginForm handleSubmit={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} />
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addNewBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      blogService.getAll().then(blogs => {
        blogs.sort((a, b) => {
          return b.likes - a.likes
        })
        setBlogs(blogs)
      })
      blogFormRef.current.toggleVisibility()
      setMessage({
        type: 'success',
        text: `a new blog ${response.title} by ${response.author} added`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return true
    } catch (exception) {
      setMessage({
        type: 'error',
        text: exception.response.data.error
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return false
    }
  }

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} />
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm addNewBlog={addNewBlog} />
        </Togglable>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleRemove={() => handleRemove(blog)} />
        )}
      </div>
    )
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      setMessage({
        type: 'success',
        text: `blog ${blog.title} by ${blog.author} removed`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      blogService.getAll().then(blogs => {
        blogs.sort((a, b) => {
          return b.likes - a.likes
        })
        setBlogs(blogs)
      })
    }
  }

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App