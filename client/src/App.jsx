import { useState } from 'react'

import './App.css'
import Drag_container from './Components/Drag_container'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Drag_container/>
    </div>
  )
}

export default App
