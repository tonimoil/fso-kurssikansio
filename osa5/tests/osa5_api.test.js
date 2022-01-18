const { test, beforeEach, expect, describe } = require('@jest/globals')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

const initBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/"
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
]

const testUser1 = { username: "testUser", name: "testUser", password: "test"}
const testUser2 = { username: "testUser2", name: "testUser", password: "test"}
let tokenForTestUser1 = ''
let tokenForTestUser2 = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (const blog of initBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
  await api.post('/api/users').send(testUser1)
  tokenForTestUser1 = (await api.post('/api/login').send(testUser1)).body.token
  await api.post('/api/users').send(testUser2)
  tokenForTestUser2 = (await api.post('/api/login').send(testUser2)).body.token
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('list of blogs is the same length as initialized length', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initBlogs.length)
})

test('confirm that the identifier id is defined', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('default likes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].likes).toBe(0)
})

describe('blogs POST fields missing', () => {
  const blogWithoutTITLE = { author: "test", likes: 1, url: "test" }
  const blogWithoutURL = { title: "test", author: "test", likes: 1 }
  const blogWithoutTITLEorURL = { author: "test", likes: 1 }

  test('title missing', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + tokenForTestUser1)
      .send(blogWithoutTITLE)
      .expect(400)
  })

  test('url missing', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + tokenForTestUser1)
      .send(blogWithoutURL)
      .expect(400)
  })

  test('both url and title missing', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + tokenForTestUser1)
      .send(blogWithoutTITLEorURL)
      .expect(400)
  })
})

describe('POST and DELETE', () => {
  test('Create post and edit is successfully', async () => {
    const blogToBeDeleted= { author: "delete this", likes: 0, url: "delete this", title: "delete this" }  
    const response = 
      await api.post('/api/blogs')
        .send(blogToBeDeleted)
        .set('Authorization', 'bearer ' + tokenForTestUser1)
  
    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', 'bearer ' + tokenForTestUser1)
      .expect(204)
  })

  test('Trying to delete a post without authorization returns 401', async () => {
    const blogToBeDeleted= { author: "delete this", likes: 0, url: "delete this", title: "delete this" }  
    const response = 
      await api.post('/api/blogs')
        .send(blogToBeDeleted)
        .set('Authorization', 'bearer ' + tokenForTestUser1)
  
    await api
      .delete(`/api/blogs/${response.body.id}`)
      .expect(401)
  })

  test('Trying to delete a post with wrong token returns 401', async () => {
    const blogToBeDeleted= { author: "delete this", likes: 0, url: "delete this", title: "delete this" }  
    const response = 
      await api.post('/api/blogs')
        .send(blogToBeDeleted)
        .set('Authorization', 'bearer ' + tokenForTestUser1)
  
    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', 'bearer ' + tokenForTestUser2)
      .expect(401)
  })
})

describe('POST and UPDATE', () => {
  test('Create post and edit it successfully', async () => {
    const blogToBeModified= { author: "update this", likes: 0, url: "update this", title: "update this" }
    const response =
    await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + tokenForTestUser1)
    .send(blogToBeModified)
    
    const newInfo = { author: "updated", likes: 1, url: "updated", title: "updated" }
    
    await api
    .put(`/api/blogs/${response.body.id}`)
    .send(newInfo)
    .expect(200)
  })

  test('Can\'t edit without token', async () => {
    const blogToBeModified= { author: "update this", likes: 0, url: "update this", title: "update this" }
    const response =
    await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + tokenForTestUser1)
    .send(blogToBeModified)
    
    const newInfo = { author: "updated", likes: 1, url: "updated", title: "updated" }
    
    await api
    .put(`/api/blogs/${response.body.id}`)
    .send(newInfo)
    .expect(200)
  })
})

describe('user creation tests', () => {
  test('no username', async () => {
    const userWithoutUsername = { name: "test", password: "test" }
    const response = await api.post('/api/users').send(userWithoutUsername)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe("User validation failed: username: Path `username` is required.")
  })

  test('no password', async () => {
    const userWithoutPassword = { name: "test", username: "test1" }
    const response = await api.post('/api/users').send(userWithoutPassword)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe("provide a password with a minimum length of 3")
  })

  test('password length less than 3', async () => {
    const passLessThan = { name: "test", username: "test2", password: "12" }
    const response = await api.post('/api/users').send(passLessThan)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe("provide a password with a minimum length of 3")
  })

  test('username length less than 3', async () => {
    const usernameLessThan = { name: "test", username: "12", password: "test" }
    const response = await api.post('/api/users').send(usernameLessThan)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe("User validation failed: username: Path `username` (`12`) is shorter than the minimum allowed length (3).")
  })

  test('username is unique', async () => {
    const newUser = { name: "test", username: "test3", password: "test" }
    await api.post('/api/users').send(newUser)
    const response = await api.post('/api/users').send(newUser)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe("User validation failed: username: Error, expected `username` to be unique. Value: `test3`")
  })
})

afterAll(() => {
  mongoose.connection.close()
})
