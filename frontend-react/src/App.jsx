import { useState } from 'react'
import './App.css'
import { Login } from './components/login'
import { Select } from './components/select'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Login />
      {/* <Select /> */}
    </div>
  )
}

export default App
