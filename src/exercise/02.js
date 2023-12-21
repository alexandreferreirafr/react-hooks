// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(initialValue = '', key, {
  serialize = JSON.stringify,
  deserialize = JSON.parse,
} = {}) {
  const [state, setState] = React.useState(
    () => {
      const valueInLocalStorage = window.localStorage.getItem(key)
      return valueInLocalStorage
        ? deserialize(valueInLocalStorage)
        : typeof initialValue === 'function'
        ? initialValue()
        : initialValue
    }
  )

  const prevKey = React.useRef(key)

  React.useEffect(() => {
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKey.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [state, key, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [name, setName] =  useLocalStorageState(initialName, 'name')

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
