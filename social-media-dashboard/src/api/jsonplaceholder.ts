
import type { User, Post, Comment, Album, Photo } from '../types'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    ...options
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${res.status} ${res.statusText}: ${text}`)
  }
  return res.json() as Promise<T>
}

// Users
export const getUsers = () => http<User[]>('/users')
export const getUser = (id: number) => http<User>(`/users/${id}`)

// Posts
export const getPostsByUser = (userId: number) => http<Post[]>(`/users/${userId}/posts`)
export const getPost = (id: number) => http<Post>(`/posts/${id}`)
export const createPost = (post: Omit<Post, 'id'>) =>
  http<Post>('/posts', { method: 'POST', body: JSON.stringify(post) })
export const updatePost = (id: number, patch: Partial<Post>) =>
  http<Post>(`/posts/${id}`, { method: 'PATCH', body: JSON.stringify(patch) })
export const deletePost = (id: number) =>
  http<{}>(`/posts/${id}`, { method: 'DELETE' })

// Comments
export const getCommentsByPost = (postId: number) => http<Comment[]>(`/posts/${postId}/comments`)
export const createComment = (comment: Omit<Comment, 'id'>) =>
  http<Comment>('/comments', { method: 'POST', body: JSON.stringify(comment) })
export const updateComment = (id: number, patch: Partial<Comment>) =>
  http<Comment>(`/comments/${id}`, { method: 'PATCH', body: JSON.stringify(patch) })
export const deleteComment = (id: number) =>
  http<{}>(`/comments/${id}`, { method: 'DELETE' })

// Albums / Photos
export const getAlbumsByUser = (userId: number) => http<Album[]>(`/users/${userId}/albums`)
export const getPhotosByAlbum = (albumId: number) => http<Photo[]>(`/albums/${albumId}/photos`)
export const getPhoto = (id: number) => http<Photo>(`/photos/${id}`)
