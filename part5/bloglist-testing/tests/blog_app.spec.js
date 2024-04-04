const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', async () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'usertest',
        username: 'usertest',
        password: 'usertest'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'usertest', 'usertest')
      await expect(page.getByText('usertest logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'usertest1', 'usertest1')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })
})

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'usertest',
        username: 'usertest',
        password: 'usertest'
      }
    })

    await page.goto('http://localhost:5173')
    loginWith(page, 'usertest', 'usertest')
  })

  test('a new blog can be created', async ({ page }) => {
    await createBlog(page, 'title', 'author', 'http://playwright.dev')
    await expect(page.getByText(`a new blog title by author added`)).toBeVisible()
  })

  test('user can like a blog', async ({ page }) => {
    createBlog(page, 'title', 'author', 'http://playwright.dev')
    await page.getByRole('button', { name: 'show' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await expect(page.getByText('likes 1')).toBeVisible()
  })

  test('user can delete a blog', async ({ page }) => {
    await createBlog(page, 'title', 'author', 'http://playwright.dev')
    await page.getByRole('button', { name: 'show' }).click()
    await expect(page.getByRole('button', { name: 'remove' })).toBeDefined()

    await page.evaluate(() => {
      window.confirm = () => true;
    })

    await page.getByRole('button', { name: 'remove' }).click()
    await expect(page.getByText('blog title by author removed')).toBeVisible()
  })

  test('other users cannot delete a blog', async ({ page, request }) => {
    createBlog(page, 'title', 'author', 'http://playwright.dev')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'usertest1',
        username: 'usertest1',
        password: 'usertest1'
      }
    })

    await page.getByRole('button', { name: 'logout' }).click()
    await loginWith(page, 'usertest1', 'usertest1')
    await page.getByRole('button', { name: 'show' }).click()
    await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
  })

  test.only('blogs are ordered by likes', async ({ page }) => {
    await createBlog(page, 'title1', 'author1', 'http://playwright.dev')
    await createBlog(page, 'title2', 'author2', 'http://playwright.dev')
    await createBlog(page, 'title3', 'author3', 'http://playwright.dev')
    
    const secondBlogElement = await page.getByText('title2 author2', { exact: true }).locator('..')
    await secondBlogElement.getByRole('button', { name: 'show'}).click()
    await secondBlogElement.getByRole('button', { name: 'like'}).click()
    await expect(secondBlogElement.getByText('likes 1')).toBeVisible() 
    await secondBlogElement.getByRole('button', { name: 'like'}).click()
    await expect(secondBlogElement.getByText('likes 2')).toBeVisible() 
    await secondBlogElement.getByRole('button', { name: 'like'}).click()
    await expect(secondBlogElement.getByText('likes 3')).toBeVisible() 
    await secondBlogElement.getByRole('button', { name: 'like'}).click()
    await expect(secondBlogElement.getByText('likes 4')).toBeVisible() 

    const thirdBlogElement = await page.getByText('title3 author3', { exact: true }).locator('..')
    await thirdBlogElement.getByRole('button', { name: 'show'}).click()
    await thirdBlogElement.getByRole('button', { name: 'like'}).click()
    await expect(thirdBlogElement.getByText('likes 1')).toBeVisible() 
    await thirdBlogElement.getByRole('button', { name: 'like'}).click()
    await expect(thirdBlogElement.getByText('likes 2')).toBeVisible() 

    const blogElements = await page.locator('.blog > div').all()
    await expect(blogElements[0].getByText('title2 author2', { exact: true })).toBeVisible()
    await expect(blogElements[1].getByText('title3 author3', { exact: true })).toBeVisible()
    await expect(blogElements[2].getByText('title1 author1', { exact: true })).toBeVisible()
  })
})
