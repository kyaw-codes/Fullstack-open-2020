const Blog = require("../models/Blog")
const User = require("../models/User")

const initialBlogs = [
    {
        title: 'Google',
        author: 'Google Dev Team',
        url: 'www.google.com',
        likes: 23000,
        userId: null
    },
    {
        title: 'TRISHA GEE | Java Champion & Developer Advocate',
        author: 'Trisha Gee',
        url: 'https://trishagee.com/',
        likes: 15000,
        userId: null
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const firstUser = async () => await (await User.find({}))[0]

module.exports = { initialBlogs, blogsInDb, firstUser }