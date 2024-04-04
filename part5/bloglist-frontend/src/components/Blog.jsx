import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleRemove }) => {
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    const newObject = {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    await blogService.update(blog.id, newObject)
    setLikes(likes + 1)
  }

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
        {visible &&
          <div>
            <div className='blog-url'>{blog.url}</div>
            <div className='blog-likes'>
              likes {likes}<button onClick={addLike}>like</button>
            </div>
            <div className='blog-username'>{blog.user.name}</div>
            {blog.user && user.username === blog.user.username &&
              <button style={{ background: 'lightblue' }} onClick={handleRemove}>remove</button>
            }
          </div>
        }
      </div>

    </div>
  )
}

export default Blog