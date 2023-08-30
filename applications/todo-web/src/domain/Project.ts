import { Item } from '@/domain'

export type Project = {
  id: string
  // sort: number
  createdAt: string
  updatedAt: string
  label: string
  items: Array<Item>
}
