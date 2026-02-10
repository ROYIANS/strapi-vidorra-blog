import { Chapter } from "./chapter"

export interface Book {
  id: string,
  slug: string,
  name: string,
  cover: number,
  path: string,
  icon?: string,
  date: Date,
  updated: Date,
  extendConfig: object,
  chapters?: Chapter[]
}
