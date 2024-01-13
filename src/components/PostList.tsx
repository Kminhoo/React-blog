import { useState, useEffect, useContext } from "react"

import AuthContext from "context/AuthContext"

import { Link } from "react-router-dom"

import { collection, deleteDoc, getDocs, doc } from "firebase/firestore"
import { db } from "firebaseAPP"

import './PostList.css'
import { toast } from "react-toastify"

interface postListPrors {
  hasNavigation? : boolean
}

export interface PostProps {
  id?: string,
  title : string,
  summary : string,
  content : string,
  createAt : string,
  email : string,
  updatedAt? : string,
  uid? : string
}

type TabType = 'all' | "my"

const PostList = ({ hasNavigation = true }: postListPrors) => {

  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [posts, setPosts] = useState<PostProps[]>([])
  const { user } = useContext(AuthContext)

  const getPosts = async () => {
    const datas = await getDocs(collection(db, 'posts'))

    setPosts([]) // 게시글 초기화

    datas?.forEach((data) => {
      const dataObj = { ...data.data(), id : data.id}
      setPosts((prev) => [...prev, dataObj as PostProps])
    })
  }

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?")

    if(confirm && id) {
      await deleteDoc(doc(db, 'posts', id))
      toast.success("게시글을 성공적으로 삭제했습니다.")
      getPosts()
    }
  }


  useEffect(() => {
    getPosts()
  }, [])

  return (
  <>
    {hasNavigation && (
      <div className="post__navigation">
        <div 
          role='presentation' 
          onClick={() => setActiveTab('all')}
          className={activeTab === 'all' ? 'post__text--show' : ''}
        >전체 글</div>
        <div 
          role='presentation' 
          onClick={() => setActiveTab('my')}
          className={activeTab === 'my' ? 'post__text--show' : ''}
        >나의 글</div>
      </div>
    )}

    <div className="post__list">
      <div className="post__list__inner">

        {posts?.length > 0 ? posts.map((post, index) => (
          <div className="post__box" key={post?.id}> {/* 키값을 주어야 하는이유 */}
            <Link to={`/posts/${post?.id}`}>
              <div className="post__title">
                {post?.title}
              </div>

              <div className="post__text">
                {post?.summary}
              </div>

              <div className="post__profile__box">
                <div className="post__profile"></div>
                <div className="post__author--name">{post?.email}</div>
                <div className="post__date">{post?.createAt}</div>
              </div>
            </Link>
              {post?.email === user?.email && (
                <div className="post__utils__box">
                  <div className="post__modify">
                    <Link className='modify' to={`/posts/edit/${post?.id}`}>수정</Link>
                  </div>
                  <div 
                    role='presentation' 
                    className="post__delete"
                    onClick={() => handleDelete(post?.id as string)}
                  >
                    삭제
                  </div>
                </div>
              )}
          </div>
        )): <div className="post__no--post">게시글이 없습니다.</div>}

      </div>
    </div>
  </>  
  )
}

export default PostList