import { useState, useEffect } from 'react';

import { Link, useParams, useNavigate } from 'react-router-dom'

import { PostProps } from './PostList';

import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from 'firebaseAPP';

import Loader from './Loader';
import Comments from './Comments';

import './PostDetail.css'
import { toast } from 'react-toastify';

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null >(null);

  const params = useParams();

  const navigation = useNavigate();

  const getPostDetail = async (id:string) => {
    if(id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({id: docSnap.id, ...docSnap.data() as PostProps})
    }
  }

  const handleDelete = async  () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?")

    if(confirm && post?.id) {
      await deleteDoc(doc(db, 'posts', post?.id ))

      toast.success("게시글을 삭제 했습니다.")
      navigation('/')
    }
  }

  useEffect(() => {
    if(params.id) getPostDetail(params?.id)
  }, [params?.id])


  return (
    <div className="post__detail">
      <div className="post__detail__inner">

        {post ? (
          <>
            <div className="post__title">
              {post?.title}
            </div>

            <div className="post__profile__box">
              <div className="post__profile"></div>
              <div className="post__author--name">{post?.email}</div>
              <div className="post__date">{post?.createAt}</div>
            </div>

            <div className="post__utils__box">
              {post?.category && (
                <div className='post__category'>{post?.category}</div>
              )}
              <div className="post__modify">
                <Link className='modify' to={`/posts/edit/${post?.id}`}>수정</Link>
              </div>
              <div onClick={handleDelete} className="post__delete">삭제</div>
            </div>

            <div className="post__text post__text--pre-wrap">
              {post?.content}
            </div>

            {/* comment  */}
            <Comments post={post} getPostDetail={getPostDetail}/>
          </>
        ) : <Loader />}

      </div>
    </div>
  )
}

export default PostDetail