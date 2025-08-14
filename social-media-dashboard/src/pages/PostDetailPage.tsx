
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteComment, getCommentsByPost, getPost, updateComment, createComment } from '../api/jsonplaceholder'
import type { Comment, Post } from '../types'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

export default function PostDetailPage() {
  const { postId } = useParams()
  const pid = Number(postId)
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>()
  const [newComment, setNewComment] = useState({ name: '', email: '', body: '' })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingBody, setEditingBody] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const [p, c] = await Promise.all([getPost(pid), getCommentsByPost(pid)])
        if (!mounted) return
        setPost(p)
        setComments(c)
      } catch (err) { setError(err) }
      finally { if (mounted) setLoading(false) }
    }
    load()
    return () => { mounted = false }
  }, [pid])

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault()
    const optimistic: Comment = { id: Math.max(0, ...comments.map(c=>c.id)) + 1, postId: pid, ...newComment }
    setComments([optimistic, ...comments])
    try {
      const created = await createComment({ postId: pid, ...newComment })
      setComments(curr => curr.map(c => c.id === optimistic.id ? { ...created, id: optimistic.id } : c))
      setNewComment({ name: '', email: '', body: '' })
    } catch (err) {
      setComments(curr => curr.filter(c => c.id !== optimistic.id))
      alert('Failed to add comment: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  async function handleUpdate(id: number) {
    const prev = comments
    setComments(curr => curr.map(c => c.id === id ? { ...c, body: editingBody } : c))
    try {
      await updateComment(id, { body: editingBody })
    } catch (err) {
      setComments(prev)
      alert('Failed to update comment: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setEditingId(null)
      setEditingBody('')
    }
  }

  async function handleDelete(id: number) {
    const prev = comments
    setComments(curr => curr.filter(c => c.id !== id))
    try {
      await deleteComment(id)
    } catch (err) {
      setComments(prev)
      alert('Failed to delete comment: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  if (loading) return <Loader />
  if (error) return <ErrorMessage error={error} />
  if (!post) return null

  return (
    <div className="grid">
      <div className="panel">
        <h2 className="title" style={{margin:0}}>{post.title}</h2>
        <p style={{whiteSpace:'pre-wrap'}}>{post.body}</p>
        <div className="row">
          <Link className="btn ghost" to={`/users/${post.userId}/posts`}>Back to Posts</Link>
        </div>
      </div>

      <div className="panel">
        <h3 className="title">Comments</h3>
        <form onSubmit={handleAddComment} className="grid" style={{marginTop:8}}>
          <input className="input" placeholder="Your name" value={newComment.name} onChange={e => setNewComment({...newComment, name: e.target.value})} required />
          <input className="input" type="email" placeholder="Your email" value={newComment.email} onChange={e => setNewComment({...newComment, email: e.target.value})} required />
          <textarea className="textarea" placeholder="Write a comment..." value={newComment.body} onChange={e => setNewComment({...newComment, body: e.target.value})} required />
          <button className="btn primary" type="submit">Add Comment</button>
        </form>

        <div className="divider" />

        <div className="list">
          {comments.map(c => (
            <div className="card" key={c.id}>
              <div className="row">
                <strong>{c.name}</strong>
                <span className="chip small">{c.email}</span>
                <span className="space" />
                {editingId !== c.id ? (
                  <button className="btn" onClick={() => { setEditingId(c.id); setEditingBody(c.body) }}>Edit</button>
                ) : (
                  <>
                    <button className="btn" onClick={() => handleUpdate(c.id)}>Save</button>
                    <button className="btn ghost" onClick={() => { setEditingId(null); setEditingBody('') }}>Cancel</button>
                  </>
                )}
                <button className="btn danger" onClick={() => handleDelete(c.id)}>Delete</button>
              </div>
              {editingId === c.id ? (
                <textarea className="textarea" value={editingBody} onChange={e => setEditingBody(e.target.value)} />
              ) : (
                <p style={{whiteSpace:'pre-wrap', marginTop:8}}>{c.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
