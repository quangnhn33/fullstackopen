const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
    })

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
    })

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
    })

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
    })

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title) {
        return response.status(400).send({ error: 'Title is required' });
    }

    if (!blog.url) {
        return response.status(400).send({ error: 'URL is required' });
    }
    
    if (!blog.likes) {
        blog.likes = 0
    }

    blog.save().then(result => {
        response.status(201).json(result)
    })
})

module.exports = blogsRouter
