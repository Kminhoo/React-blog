import { useState, useEffect, useContext } from "react"

import AuthContext from "context/AuthContext"

import { Link } from "react-router-dom"

import { collection, deleteDoc, getDocs, doc, query, orderBy, where } from "firebase/firestore"
import { db } from "firebaseAPP"

import './PostList.css'
import { toast } from "react-toastify"

type TabType = 'all' | "my"

interface postListPrors {
  hasNavigation? : boolean,
  defaultTab? : TabType | CategoryType
}

export type CategoryType = 'Frontend' | 'BackEnd' | 'Web' | 'Native' ;
export const CATEGORIES: CategoryType[] = ['Frontend', 'BackEnd', 'Web', 'Native'];

export interface PostProps {
  id?: string,
  title : string,
  summary : string,
  content : string,
  createAt : string,
  email : string,
  updatedAt? : string,
  uid? : string,
  category? : CategoryType
}


const PostList = ({ hasNavigation = true, defaultTab = "all" }: postListPrors) => {

  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(defaultTab)
  const [posts, setPosts] = useState<PostProps[]>([])
  const { user } = useContext(AuthContext)

  const getPosts = async () => {
    // const datas = await getDocs(collection(db, 'posts'))

    let postRef = collection(db, 'posts') 
    //console.log('postRef = ', postRef) //posts 콜렉션 전체를 참조하는 것
    let postsQuery;
    //console.log('postsQuery = ', postsQuery) // 참조된 컬렉션을 orderby를 통해 정리하는 것

    if(activeTab === "my" && user?.uid) {
      postsQuery =  query(postRef, where("uid", "==", user?.uid), orderBy('createAt', 'desc'))
      // where(필드명, 같다, 필드값)
    } else if (activeTab === 'all'){
      postsQuery = query(postRef, orderBy('createAt', 'desc'))
    } else {
      postsQuery = query(postRef, where("category", "==", activeTab), orderBy('createAt', 'desc'))
    }

    const datas = await getDocs(postsQuery)

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
  }, [activeTab])

  return (
  <>
    {hasNavigation && (
      <div className="post__navigation">
        <div 
          role='presentation' 
          onClick={() => setActiveTab('all')}
          className={activeTab === 'all' ? 'post__text--show' : ''}
        >
          전체 글
        </div>
        <div 
          role='presentation' 
          onClick={() => setActiveTab('my')}
          className={activeTab === 'my' ? 'post__text--show' : ''}
        >나의 글
        </div>
        {CATEGORIES?.map((category) => (
          <div 
          key={category}
          role='presentation' 
          onClick={() => setActiveTab(category)}
          className={activeTab === category ? 'post__text--show' : ''}
          >
            {category}
          </div>
        ))}
      </div>
    )}

    <div className="post__list">
      <div className="post__list__inner">

        {posts?.length > 0 ? posts.map((post) => (
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