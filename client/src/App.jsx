 import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import Addblog from './pages/admin/Addblog'
import Listblog from './pages/admin/Listblog'
import Comments from './pages/admin/Comments'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        
        {/* Admin Layout with nested routes */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<Addblog />} />
          <Route path="listblog" element={<Listblog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
