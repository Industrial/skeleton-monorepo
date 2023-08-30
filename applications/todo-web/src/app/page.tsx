import TodoList from '@/app/_components/TodoList'
import { serverClient } from '@/app/_trpc/serverClient'

export default async (): Promise<JSX.Element> => {
  const todos = await serverClient.getItems()

  return (
    <main>
      <TodoList initialItems={todos} />
    </main>
  )
}
