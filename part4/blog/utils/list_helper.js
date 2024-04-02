const dummy = (blogs) => {
    blogs
    return 1
  }
  
  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }
  
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    return blogs.reduce((favoriteBlog, blog) => blog.likes > favoriteBlog.likes ? blog : favoriteBlog)
  }
  
  const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
    let blogsCount = {}
    for (const blog of blogs) {
      if (!Object.prototype.hasOwnProperty.call(blogsCount, blog.author)) {
        blogsCount[blog.author] = 0
      }
      blogsCount[blog.author]++
    }
  
    const getMostBlogs = () => {
      let maxAuthor = null
      let maxBlogs = -Infinity
  
      for (const [key, value] of Object.entries(blogsCount)) {
        if (value > maxBlogs) {
          maxAuthor = key
          maxBlogs = value
        }
      }
  
      return { author: maxAuthor, blogs: maxBlogs }
    }
  
    return getMostBlogs()
  }
  
  const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
    let likesCount = {}
    for (const blog of blogs) {
      if (!Object.prototype.hasOwnProperty.call(likesCount, blog.author)) {
        likesCount[blog.author] = 0
      }
      likesCount[blog.author] += blog.likes
    }
  
    const getMostLikes = () => {
      let maxAuthor = null
      let maxLikes = -Infinity
  
      for (const [key, value] of Object.entries(likesCount)) {
        if (value > maxLikes) {
          maxAuthor = key
          maxLikes = value
        }
      }
  
      return { author: maxAuthor, likes: maxLikes }
    }
  
    return getMostLikes()
  }
  
  module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }