import React from "react"
// import logo from "./logo.svg"
// import "./App.css"

import BarChart from "./components/bar-chart"

function App() {
  return (
    <div>
      <h2>App</h2>
      <BarChart data={[5, 10, 1, 3]} size={[500, 500]} />
    </div>
  )
}

export default App
