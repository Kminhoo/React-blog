import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from 'pages/home/HomePage'
import PostDetailPage from 'pages/posts/PostDetailPage'
import ProfilePage from 'pages/profile/ProfilePage'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/posts" element={<h1>게시글 목록 페이지</h1>} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="/posts/new" element={<h1>게시글 작성 페이지</h1>} />
      <Route path="/posts/edit/:id" element={<h1>특정 게시글 수정 페이지</h1>} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<h1>로그인 페이지</h1>} />
      <Route path="/signup" element={<h1>회원가입 페이지</h1>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default Router

