const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs
        .map((b) => b.likes)
        .reduce((accumulator, current) => accumulator + current)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return 0

  const max = Math.max(...blogs.map((blog) => blog.likes))
  const blog = blogs.find((b) => b.likes === max)

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0

  const blogCountByAuthor = _.map(_.countBy(blogs, 'author'), (val, key) => ({
    author: key,
    blogs: val,
  }))

  const mostBlogs = Math.max.apply(
      Math, blogCountByAuthor.map(author => author.blogs)
  )

  const authorWithMostBlogs = blogCountByAuthor.find(author => author.blogs === mostBlogs)
  return authorWithMostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
}
