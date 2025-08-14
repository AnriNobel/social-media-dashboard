
import { getUsers, getPostsByUser, createPost } from './jsonplaceholder'

// Mock fetch
const g: any = globalThis
beforeAll(() => {
  g.fetch = vi.fn(async (url: string, options?: RequestInit) => {
    if (String(url).endsWith('/users')) {
      return { ok: true, json: async () => ([{ id: 1, name: 'Leanne', username: 'leanne', email: 'l@e.com', phone: '', website: '' }]) }
    }
    if (String(url).endsWith('/users/1/posts')) {
      return { ok: true, json: async () => ([{ userId: 1, id: 1, title: 'Hello', body: 'World' }]) }
    }
    if (String(url).endsWith('/posts') && options?.method === 'POST') {
      return { ok: true, json: async () => ({ userId: 1, id: 101, title: 'New', body: 'Post' }) }
    }
    return { ok: false, status: 404, statusText: 'Not Found', text: async () => 'not found' }
  })
})

it('fetches users', async () => {
  const users = await getUsers()
  expect(users[0].name).toBe('Leanne')
})

it('fetches posts by user', async () => {
  const posts = await getPostsByUser(1)
  expect(posts[0].title).toBe('Hello')
})

it('creates post', async () => {
  const post = await createPost({ userId: 1, title: 'X', body: 'Y' })
  expect(post.id).toBe(101)
})
