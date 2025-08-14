
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../api/jsonplaceholder'
import type { User } from '../types'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>()

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getUsers()
      .then(data => { if (mounted) setUsers(data) })
      .catch(err => setError(err))
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  if (loading) return <Loader />
  if (error) return <ErrorMessage error={error} />

  return (
    <div className="grid cols-3">
      {users.map(u => (
        <div className="card" key={u.id}>
          <h3 className="title">{u.name}</h3>
          <div className="muted small">@{u.username} • {u.email}</div>
          <div className="divider" />
          <div className="row">
            <Link className="btn" to={`/users/${u.id}/posts`}>Posts</Link>
            <Link className="btn ghost" to={`/users/${u.id}/albums`}>Albums</Link>
            <span className="space" />
            <span className="chip small">{u.website}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
