
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAlbumsByUser, getUser } from '../api/jsonplaceholder'
import type { Album, User } from '../types'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

export default function UserAlbumsPage() {
  const { userId } = useParams()
  const uid = Number(userId)
  const [user, setUser] = useState<User | null>(null)
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>()

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const [u, a] = await Promise.all([getUser(uid), getAlbumsByUser(uid)])
        if (!mounted) return
        setUser(u)
        setAlbums(a)
      } catch (err) {
        setError(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [uid])

  if (loading) return <Loader />
  if (error) return <ErrorMessage error={error} />

  return (
    <div className="grid">
      <div className="panel">
        <div className="row">
          <h2 className="title" style={{margin:0}}>{user?.name ?? `User #${uid}`} — Albums</h2>
          <span className="space" />
          <Link className="btn ghost" to={`/users/${uid}/posts`}>View Posts</Link>
        </div>
      </div>
      <div className="grid cols-3">
        {albums.map(a => (
          <div className="card" key={a.id}>
            <h3 className="title">{a.title}</h3>
            <div className="row">
              <Link className="btn" to={`/albums/${a.id}/photos`}>Open Photos</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
