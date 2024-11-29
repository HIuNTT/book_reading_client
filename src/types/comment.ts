import { User } from './user'

export interface Comment {
  id: number
  comment: string
  chapter_id: number
  title: string
  like_count: number
  parent_id: number
  reply_count: number
  last_updated: string
  check_like: boolean
  user: User
}
