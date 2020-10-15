require('express-async-errors')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogsRouter.get(`/`, async (req, res) => {
  const blogs = await Blog.find({}).populate('userId')
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const token = req.token

  if (!token)
    return res.status(400).send({ error: 'You need to login first' })
  
  const decodedToken = jwt.decode(token, process.env.SECRET)

  const user = await User.findOne({ username: decodedToken.username })
  
  if (!body.title && !body.url) 
    return res.status(400).send({ error: 'Blog title and url cannot be empty!' })

  if (!user)
    return res.status(400).send({ error: 'Login user not found' })

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    userId: user.id,
  }).save()

  user.blogs = user.blogs.concat(blog.id)
  await user.save()

  res.status(201).json(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const token = req.token
  
  if (!token)
    return res.status(400).send({ error: 'You need to login first' })
  
  const decodedToken = jwt.decode(token, process.env.SECRET)
  const blog = await Blog.findById(id)

  if (blog.userId.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(id)
    res.status(204).end()
  } else {
    res.status(401).json({ error: 'You cannot delete another user\'s blog!!!' })
  }

})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const token = req.token
  
  if (!token) 
    return req.status(400).json({ error: 'You need to login first' })

  const decodedToken = jwt.decode(token, process.env.SECRET)
  const blog = req.body

  const blogToUpdate = await Blog.findById(id)
  
  if (blogToUpdate.userId.toString() === decodedToken.id.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    res.status(200).json(updatedBlog);
  } else {
    res.status(401).json({ error: 'You cannot update another user\'s blog!!!' })
  }

})

module.exports = blogsRouter
