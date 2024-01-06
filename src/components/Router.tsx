import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from 'pages/home/HomePage'
import PostDetailPage from 'pages/posts/PostDetailPage'
import ProfilePage from 'pages/profile/ProfilePage'
import NewPostPage from 'pages/posts/NewPostPage'
import EditPostPage from 'pages/posts/EditPostPage'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/posts" element={<h1>게시글 목록 페이지</h1>} />
      <Route path="/posts/:id" element={ <PostDetailPage /> } />
      <Route path="/posts/new" element={ <NewPostPage /> } />
      <Route path="/posts/edit/:id" element={ <EditPostPage /> } />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<h1>로그인 페이지</h1>} />
      <Route path="/signup" element={<h1>회원가입 페이지</h1>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default Router

