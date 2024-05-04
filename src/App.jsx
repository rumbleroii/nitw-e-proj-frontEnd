import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Home from './components/Home'
import Result from './components/Result'

const App = () => {
  return (
    <Router>
        <Routes>
            {/* Add a parameter to the path */}
            <Route path={"/"} element={<Home/>}></Route>
            <Route path={"/:param"} element={<Home/>}></Route>
            <Route path={"/result"} element={<Result/>}></Route>
        </Routes>
    </Router>
  )
}

export default App
