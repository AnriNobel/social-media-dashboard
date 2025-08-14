
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPhotosByAlbum } from '../api/jsonplaceholder'
import type { Photo } from '../types'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

export default function AlbumPhotosPage() {
  const { albumId } = useParams()
  const aid = Number(albumId)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>()

  useEffect(() => {
    let mounted = true
    getPhotosByAlbum(aid)
      .then(data => { if (mounted) setPhotos(data) })
      .catch(setError)
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [aid])

  if (loading) return <Loader />
  if (error) return <ErrorMessage error={error} />

  return (
    <div className="grid cols-4">
      {photos.map(p => (
        <Link to={`/photos/${p.id}`} key={p.id} className="card" style={{display:'block'}}>
          <img src={p.thumbnailUrl} alt={p.title} style={{width:'100%', borderRadius:8}} />
          <div className="small" style={{marginTop:8}}>{p.title}</div>
        </Link>
      ))}
    </div>
  )
}
