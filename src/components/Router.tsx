import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from '../pages/home/HomePage'
import PostList from '../pages/posts/PostList'
import PostDetail from '../pages/posts/PostDetail'
import NewPost from '../pages/posts/NewPost'
import PostEdit from '../pages/posts/PostEdit'
import Profile from '../pages/profile/ProfilePage'
import LoginPage from '../pages/login/LoginPage'
import SignupPage from '../pages/signup/SignupPage'

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={ <HomePage /> } />
      <Route path='/posts' element={ <PostList /> } />
      <Route path='/posts:id' element={ <PostDetail /> } />
      <Route path='/posts/new' element={ <NewPost /> } />
      <Route path='/posts/edit/:id' element={ <PostEdit /> } />
      <Route path='/profile' element={ <Profile /> } />
      <Route path='/login' element={ <LoginPage /> } />
      <Route path='/signup' element={ <SignupPage /> } />
      <Route path='*' element={ <Navigate replace to='/' /> } />
    </Routes>
  )
}