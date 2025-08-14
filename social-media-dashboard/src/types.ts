
export type User = {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export type Comment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export type Album = {
  userId: number
  id: number
  title: string
}

export type Photo = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}
