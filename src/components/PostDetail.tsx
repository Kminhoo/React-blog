import { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom'

import { PostProps } from './PostList';

import { doc, getDoc } from "firebase/firestore";
import { db } from 'firebaseAPP';

import Loader from './Loader';

import './PostDetail.css'

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null >(null);

  const params = useParams();

  const getPostDetail = async (id:string) => {
    if(id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({id: docSnap.id, ...docSnap.data() as PostProps})
    }
  }

  useEffect(() => {
    if(params.id) {
      getPostDetail(params?.id)
    }
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
              <div className="post__modify">
                <Link className='modify' to={`/posts/edit/${post?.id}`}>수정</Link>
              </div>
              <div className="post__delete">삭제</div>
            </div>

            <div className="post__text post__text--pre-wrap">
              {post?.content}
            </div>
          </>
        ) : <Loader />}

      </div>
    </div>
  )
}

export default PostDetail