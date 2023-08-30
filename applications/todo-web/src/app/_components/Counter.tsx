import './Counter.css'

import { createSignal } from 'solid-js'

export const Counter = (): JSX.Element => {
  const [count, setCount] = createSignal(0)
  return (
    <button
      class="increment"
      onClick={() => {
        return setCount(count() + 1)
      }}
    >
      Clicks: {count()}
    </button>
  )
}
