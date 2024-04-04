import { useState } from 'react'

const BlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddNewBlog = async (event) => {
    event.preventDefault()
    const newBlogAdded = await addNewBlog({
      title: title,
      author: author,
      url: url
    })
    if (newBlogAdded) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form className='form-blog' onSubmit={handleAddNewBlog}>
        <div>
          title:
          <input
            data-testid='title'
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid='author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid='url'
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className='btn-add-blog' type="submit">create</button>
      </form>
    </div>)
}

export default BlogForm