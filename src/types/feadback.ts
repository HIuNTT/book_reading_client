import { User } from "./user";

export interface FeedbackItem {
  id: number,
  content: string,
  rating: number,
  last_updated: string,
  user: User
}
export interface FeedBackPayload {
  content: string,
  rating: number,
}