import { Post } from './post'

export interface Tag {
  id: string,
  slug: string,
  name: string,
  count: number,
  path: string,
  icon?: string,
  posts?: Post[]
}
