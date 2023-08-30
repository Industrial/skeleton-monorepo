import { List, Project, Tag } from '@/domain'

export type Item = {
  id: string
  // sort: number
  createdAt: string
  updatedAt: string
  label: string
  complete: boolean
  list: List
  project: Project
  tags: Array<Tag>
}
