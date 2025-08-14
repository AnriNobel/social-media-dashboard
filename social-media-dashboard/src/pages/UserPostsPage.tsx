
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { createPost, deletePost, getPostsByUser, getUser, updatePost } from '../api/jsonplaceholder'
import type { Post, User } from '../types'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import PostForm from '../components/PostForm'

export default function UserPostsPage() {
  const { userId } = useParams()
  const uid = Number(userId)
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>()
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const [u, p] = await Promise.all([getUser(uid), getPostsByUser(uid)])
        if (!mounted) return
        setUser(u)
        setPosts(p)
      } catch (err) {
        setError(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [uid])

  const username = useMemo(() => user?.name ?? `User #${uid}`, [user, uid])

  async function handleCreate(data: { title: string; body: string }) {
    const optimistic: Post = { userId: uid, id: Math.max(0, ...posts.map(p=>p.id)) + 1, title: data.title, body: data.body }
    setPosts([optimistic, ...posts])
    try {
      const created = await createPost({ userId: uid, title: data.title, body: data.body })
      // Replace optimistic with server echo (JSONPlaceholder returns id 101)
      setPosts(curr => curr.map(p => p.id === optimistic.id ? { ...created, id: p.id } : p))
    } catch (err) {
      setPosts(curr => curr.filter(p => p.id !== optimistic.id))
      alert('Failed to create post: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setCreating(false)
    }
  }

  async function handleUpdate(id: number, data: { title: string; body: string }) {
    const prev = posts
    setPosts(curr => curr.map(p => p.id === id ? { ...p, ...data } : p))
    try {
      await updatePost(id, data)
    } catch (err) {
      setPosts(prev)
      alert('Failed to update post: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setEditingId(null)
    }
  }

  async function handleDelete(id: number) {
    const prev = posts
    setPosts(curr => curr.filter(p => p.id !== id))
    try {
      await deletePost(id)
    } catch (err) {
      setPosts(prev)
      alert('Failed to delete post: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  if (loading) return <Loader />
  if (error) return <ErrorMessage error={error} />

  return (
    <div className="grid">
      <div className="panel">
        <div className="row">
          <h2 className="title" style={{margin:0}}>{username} — Posts</h2>
          <span className="space" />
          <Link className="btn ghost" to={`/users/${uid}/albums`}>View Albums</Link>
          <button className="btn primary" onClick={() => setCreating(true)}>New Post</button>
        </div>
        {creating && (
          <div className="divider" />
        )}
        {creating && (
          <PostForm submitLabel="Create" onCancel={() => setCreating(false)} onSubmit={handleCreate} />
        )}
      </div>

      <div className="list">
        {posts.map(p => (
          <div className="panel" key={p.id}>
            {editingId === p.id ? (
              <PostForm
                initial={p}
                submitLabel="Update"
                onCancel={() => setEditingId(null)}
                onSubmit={(data) => handleUpdate(p.id, data)}
              />
            ) : (
              <>
                <h3 className="title">{p.title}</h3>
                <p style={{whiteSpace:'pre-wrap'}}>{p.body}</p>
                <div className="row">
                  <Link className="btn" to={`/posts/${p.id}`}>Open</Link>
                  <button className="btn" onClick={() => setEditingId(p.id)}>Edit</button>
                  <button className="btn danger" onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
