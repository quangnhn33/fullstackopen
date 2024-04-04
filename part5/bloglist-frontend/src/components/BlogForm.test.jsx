import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('test for the new blog form', async () => {
  const user = userEvent.setup()
  const addNewBlog = vi.fn()

  const { container } = render(<BlogForm addNewBlog={addNewBlog} />)

  const inputTitle = container.querySelector('.input-title')
  const inputAuthor = container.querySelector('.input-author')
  const inputUrl = container.querySelector('.input-url')
  const button = container.querySelector('.btn-add-blog')

  await user.type(inputTitle, 'Sample Blog Post')
  await user.type(inputAuthor, 'John Doe')
  await user.type(inputUrl, 'https://example.com/sample-blog-post')
  await user.click(button)

  expect(addNewBlog.mock.calls).toHaveLength(1)
  expect(addNewBlog.mock.calls[0][0].title).toBe('Sample Blog Post')
  expect(addNewBlog.mock.calls[0][0].author).toBe('John Doe')
  expect(addNewBlog.mock.calls[0][0].url).toBe('https://example.com/sample-blog-post')
})
