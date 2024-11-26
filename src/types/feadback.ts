import { User } from "./user";

export interface FeedbackItem {
  id: number,
  content: string,
  rating: number,
  last_updated: string,
  user: User
}