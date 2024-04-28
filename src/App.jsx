import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Home from './components/Home'
import Result from './components/Result'
import Test from './components/test'

const App = () => {
  return (
    <Router>
        <Routes>
            {/* Add a parameter to the path */}
            <Route path={"/"} element={<Home/>}></Route>
            <Route path={"/:param"} element={<Home/>}></Route>
            <Route path={"/result"} element={<Result/>}></Route>
            <Route path={"/test"} element={<Test/>}></Route>
        </Routes>
    </Router>
  )
}

export default App
