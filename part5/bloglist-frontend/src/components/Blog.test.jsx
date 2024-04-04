import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {
  const blog = {
    user: {
      id: '123',
      username: 'johndoe',
      name: 'John Doe'
    },
    likes: 10,
    author: 'John Doe',
    title: 'Sample Blog Post',
    url: 'https://example.com/sample-blog-post'
  }

  const user = {
    id: '123',
    username: 'johndoe',
    name: 'John Doe'
  }

  const { container } = render(<Blog blog={blog} user={user} />)
  let element

  element = screen.getByText(`${blog.title} ${blog.author}`)
  expect(element).toBeDefined()

  element = container.querySelector('.blog-url')
  expect(element).toBeNull()

  element = container.querySelector('.blog-likes')
  expect(element).toBeNull()

  element = container.querySelector('.blog-username')
  expect(element).toBeNull()
})


test('blog\'s URL and number of likes are shown when button clicked', async () => {
  const blog = {
    user: {
      id: '123',
      username: 'johndoe',
      name: 'John Doe'
    },
    likes: 10,
    author: 'John Doe',
    title: 'Sample Blog Post',
    url: 'https://example.com/sample-blog-post'
  }

  const user = {
    id: '123',
    username: 'johndoe',
    name: 'John Doe'
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const mockUser = userEvent.setup()
  const button = screen.getByText('show')
  await mockUser.click(button)

  let element = container.querySelector('.blog-url')
  expect(element).toBeDefined()
  expect(element.textContent === blog.url).toBeTruthy()

  element = container.querySelector('.blog-likes')
  expect(element).toBeDefined()
})
