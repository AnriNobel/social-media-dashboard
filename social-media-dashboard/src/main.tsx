
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App'
import UsersPage from './pages/UsersPage'
import UserPostsPage from './pages/UserPostsPage'
import UserAlbumsPage from './pages/UserAlbumsPage'
import PostDetailPage from './pages/PostDetailPage'
import AlbumPhotosPage from './pages/AlbumPhotosPage'
import PhotoDetailPage from './pages/PhotoDetailPage'
import './styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/users" replace /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'users/:userId/posts', element: <UserPostsPage /> },
      { path: 'users/:userId/albums', element: <UserAlbumsPage /> },
      { path: 'posts/:postId', element: <PostDetailPage /> },
      { path: 'albums/:albumId/photos', element: <AlbumPhotosPage /> },
      { path: 'photos/:photoId', element: <PhotoDetailPage /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
