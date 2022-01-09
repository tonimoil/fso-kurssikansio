const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', '-blogs')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
    user: request.user._id
  })

  const savedBlog = await blog.save()
  request.user.blogs= request.user.blogs.concat(savedBlog._id)
  await request.user.save({ validateModifiedOnly : true })
  
  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id){
    return response.status(401).json({ error: 'Only logged in users can delete blogs' })
  }
  
  const toBeDeletedBlog = await Blog.findById(request.params.id).populate('user')

  if (request.user.id === toBeDeletedBlog.user.id) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'You can only deleted blogs posted by you' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  
  const newBlog = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.json(updatedBlog.toJSON())
})

  module.exports = blogsRouter
