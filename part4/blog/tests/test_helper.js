const Blog = require('../models/blog')

initialBlogs = [
    {
      "title": "10 Tips for Better Productivity",
      "author": "Jane Smith",
      "url": "https://www.example.com/10-tips-for-better-productivity",
      "likes": 75
    },
    {
      "title": "The Art of Mindfulness: Finding Inner Peace",
      "author": "Michael Johnson",
      "url": "https://www.example.com/the-art-of-mindfulness",
      "likes": 120
    },
    {
      "title": "Exploring the Wonders of Nature: A Journey",
      "author": "Emily Brown",
      "url": "https://www.example.com/exploring-nature",
      "likes": 90
    },
    {
      "title": "Mastering the Basics of Cooking: A Beginner's Guide",
      "author": "David Lee",
      "url": "https://www.example.com/mastering-cooking-basics",
      "likes": 85
    },
    {
      "title": "Unlocking the Secrets of Success",
      "author": "Sophia Johnson",
      "url": "https://www.example.com/secrets-of-success",
      "likes": 150
    },
    {
      "title": "The Power of Positive Thinking",
      "author": "Alex Turner",
      "url": "https://www.example.com/power-of-positive-thinking",
      "likes": 110
    },
    {
      "title": "A Beginner's Guide to Yoga",
      "author": "Rachel Green",
      "url": "https://www.example.com/beginners-guide-to-yoga",
      "likes": 95
    },
    {
      "title": "The Impact of Technology on Society",
      "author": "Daniel Wilson",
      "url": "https://www.example.com/impact-of-technology",
      "likes": 105
    },
    {
      "title": "10 Must-Visit Destinations Around the World",
      "author": "Olivia Parker",
      "url": "https://www.example.com/must-visit-destinations",
      "likes": 130
    },
    {
      "title": "The Importance of Mental Health Awareness",
      "author": "Matthew Harris",
      "url": "https://www.example.com/mental-health-awareness",
      "likes": 80
    }
  ]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'John Doe', url: 'https://www.example.com/willremovethissoon', likes: 100 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}
  
module.exports = {initialBlogs, blogsInDb, nonExistingId }