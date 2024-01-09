import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from 'pages/home/HomePage'
import PostDetailPage from 'pages/posts/PostDetailPage'
import ProfilePage from 'pages/profile/ProfilePage'
import NewPostPage from 'pages/posts/NewPostPage'
import EditPostPage from 'pages/posts/EditPostPage'
import LoginPage from 'pages/login/LoginPage'
import SignupPage from 'pages/signup/SignupPage'
import PostListPage from 'pages/posts/PostListPage'

interface RouterProps {
  isAuthenticated: boolean
};

const Router = ({ isAuthenticated }: RouterProps) => {

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/posts" element={ <PostListPage />} />
          <Route path="/posts/:id" element={ <PostDetailPage /> } />
          <Route path="/posts/new" element={ <NewPostPage /> } />
          <Route path="/posts/edit/:id" element={ <EditPostPage /> } />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/signup" element={ <SignupPage /> } />
          <Route path='*' element={ <LoginPage /> } />
        </>
      )}
    </Routes>
  )
}

export default Router

