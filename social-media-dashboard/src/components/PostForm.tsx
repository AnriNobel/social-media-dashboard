
import { useState } from 'react'
import type { Post } from '../types'

type Props = {
  initial?: Partial<Post>
  onSubmit: (data: { title: string; body: string }) => Promise<void> | void
  onCancel?: () => void
  submitLabel?: string
}

export default function PostForm({ initial, onSubmit, onCancel, submitLabel = 'Save' }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [body, setBody] = useState(initial?.body ?? '')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      setSubmitting(true)
      await onSubmit({ title, body })
      setTitle(''); setBody('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid">
      <input className="input" placeholder="Post title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea className="textarea" placeholder="Write something..." value={body} onChange={e => setBody(e.target.value)} required />
      <div className="row">
        <button className="btn primary" type="submit" disabled={submitting}>{submitLabel}</button>
        {onCancel && <button className="btn ghost" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}
