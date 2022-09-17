/* eslint-disable camelcase */
export interface User {
  user_name: string
  user_image: string
  id: string
}

export interface Post {
  created_at: number
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
