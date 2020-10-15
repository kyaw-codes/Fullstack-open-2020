const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')
const helper = require('./blogs_api_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
    const promiseArr = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArr)
})


describe('blogs are returned', () => {
    
    test('Api will return all the blogs', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .then(async (res) => expect(await res.body).toHaveLength(helper.initialBlogs.length))
    })

    test('The unique identifier id do exist for blog posts', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => expect(blog.id).toBeDefined())
    })

})

const login = async () => {
    const user = await helper.firstUser()

    const credential = await api
        .post('/login')
        .send({ username: user.username, password: 'kyaw-monkey' })
    return credential.body
}

describe('creating blog', () => {
    
    test('Create a blog successfully if valid', async () => {        
                
        const blogsAtStart = await helper.blogsInDb()
        const token = await (await login()).token

        const blog = {
            title: 'Test Blog',
            author: 'Test Author',
            url: 'https://www.test_url.com',
            likes: 100
        }

        const createdBlog = await api
            .post('/api/blogs')
            .send(blog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
        
        const blogsAtEnd = await helper.blogsInDb()
        
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
        
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(createdBlog.body.title)
    })

    test('Response with status 400 if the request body is missing title and url properties', async () => {
        const token = await(await login()).token
        
        const newBlog = await new Blog({
            author: 'Hentai Monkey'
        })
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(400)

        expect(await helper.blogsInDb()).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deleting blog', () => {
    
    test('Api delete a blog correctly if request is valid', async () => {
        const blogsFromStart = await helper.blogsInDb()
        const blogToDelete = blogsFromStart[0]
        const token = await(await(login())).token
        
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)
                        
        const blogsFromEnd = await helper.blogsInDb()
        expect(blogsFromEnd).toHaveLength(blogsFromStart.length - 1)
    })

    test('Request without token will be responsed with suitable status code.', async () => {
        const blogsFromStart = await helper.blogsInDb()
        const blogToDelete = blogsFromStart[0]

        console.log(blogToDelete.id)

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(400)

        const blogsFromEnd = await helper.blogsInDb()
        expect(blogsFromEnd).toHaveLength(helper.initialBlogs.length)
    })

    // test('Request without id param will be responsed with status 404', async () => {
    //     const blogsFromStart = await helper.blogsInDb();

    //     await api.delete(`/api/blogs`).expect(404);

    //     const blogsFromEnd = await helper.blogsInDb();
    //     expect(blogsFromEnd).toHaveLength(blogsFromStart.length);
    // })

})

// describe('updating blog', () => {

//     test('Api will update blog and response with status 200 if valid', async () => {
//         const blogsFromStart = await helper.blogsInDb()
//         const blogToUpdate = { ...blogsFromStart[0], likes: blogsFromStart[0].likes * 10 }

//         await api
//             .put(`/api/blogs/${blogToUpdate.id}`)
//             .send(blogToUpdate)
//             .expect(200)
        
//         const blogsFromEnd = await helper.blogsInDb()
//         const updatedBlogs = blogsFromEnd[0]
//         expect(updatedBlogs.likes).toBe(blogToUpdate.likes)
//     })
// })

afterAll(() => mongoose.connection.close())
