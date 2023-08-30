import { Item } from '@/domain'

export type Tag = {
  id: string
  // sort: number
  createdAt: string
  updatedAt: string
  label: string
  items: Array<Item>
}
