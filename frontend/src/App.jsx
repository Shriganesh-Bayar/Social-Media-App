import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'

import Layout from './pages/Layout'
import Layout2 from './pages/Layout2'

import Home from './pages/Home'
import Post from './pages/Post'

import Signin from './pages/User/Signin'
import Login from './pages/User/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}> 
          <Route index element={<Home/>} />
          <Route path="post/:id" element={<Post/>}/>
        </Route>
        <Route path="/user" element={<Layout2/>}>
          <Route path="signin" element={<Signin/>} />
          <Route path="login" element={<Login/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
