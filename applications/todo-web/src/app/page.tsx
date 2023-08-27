import TodoList from '@/app/_components/TodoList'
import { serverClient } from '@/app/_trpc/serverClient'

const Home = async (): Promise<JSX.Element> => {
  const todos = await serverClient.getTodos()
  return (
    <main className="max-w-3xl mx-auto mt-5">
      <TodoList initialTodos={todos} />
    </main>
  )
}

export default Home
