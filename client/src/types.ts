/* eslint-disable camelcase */
export interface User {
  user_name: string
  user_image: string
  id: string
}

export interface Post {
  id: string
  created_at: number
  updated_at: number
  created_by: string
  image?: string
  message_text?: string
  subject: string
  user: {
    id: string
    user_image: string
    user_name: string
  }
}
