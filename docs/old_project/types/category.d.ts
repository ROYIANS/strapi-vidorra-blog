import { Post } from './post'

export interface Category {
  id: string,
  slug: string,
  name: string,
  length: number,
  path: string,
  permalink: string,
  icon?: string,
  posts?: Post[]
}
