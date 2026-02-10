import { Post } from "./post";

export interface Chapter {
  id: string,
  slug: string,
  name: string,
  cover: number,
  path: string,
  icon?: string,
  index: number,
  children?: Chapter[]
  posts?: Post[]
}
