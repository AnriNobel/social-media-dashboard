
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPhoto } from '../api/jsonplaceholder'
import type { Photo } from '../types'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

export default function PhotoDetailPage() {
  const { photoId } = useParams()
  const pid = Number(photoId)
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>()

  useEffect(() => {
    let mounted = true
    getPhoto(pid)
      .then(data => { if (mounted) setPhoto(data) })
      .catch(setError)
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [pid])

  if (loading) return <Loader />
  if (error) return <ErrorMessage error={error} />
  if (!photo) return null

  return (
    <div className="panel">
      <img src={photo.url} alt={photo.title} style={{maxWidth:'100%', borderRadius:12}} />
      <h3 className="title" style={{marginTop:12}}>{photo.title}</h3>
      <div className="muted small">Photo #{photo.id} • Album #{photo.albumId}</div>
    </div>
  )
}
