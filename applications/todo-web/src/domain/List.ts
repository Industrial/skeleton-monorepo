import { Item } from '@/domain'

export type List = {
  id: string
  // sort: number
  createdAt: string
  updatedAt: string
  label: string
  items: Array<Item>
}
