import { Tag } from "./tag"
import { Category } from "./category"

export interface Post {
  uniqueId: string,
  title: string,
  layout: string,
  author: string,
  type: 'post' | 'page'
  date: Date,
  updated: Date,
  comments: Boolean,
  sticky: boolean,
  full_source: string,
  password: string,
  description: string,
  keywords: string[],
  cover: string[],
  link: string,
  recommend: boolean,
  photos: string[],
  categories: Category[],
  tags: Tag[]
}
