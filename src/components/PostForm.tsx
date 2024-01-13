import { useState, useContext, useEffect } from 'react'

import AuthContext from "context/AuthContext"

import { useNavigate, useParams } from 'react-router-dom';

import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore"; 
import { db } from 'firebaseAPP';

import { toast } from 'react-toastify';

import './PostForm.css'

import { CATEGORIES, CategoryType, PostProps } from './PostList';


const PostForm = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<CategoryType>('Frontend');
  const params = useParams();

  const { user } = useContext(AuthContext);

  const navigation = useNavigate();


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if(post && post.id) {
        const postRef = doc(db, 'posts', post?.id)

        await updateDoc(postRef, {
          title,
          summary,
          content,
          updatedAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }),
          category
        })

        toast.success("게시글이 성공적으로 수정되었습니다.")
        navigation(`/posts/${post?.id}`)
      } else {
        await addDoc(collection(db, 'posts'), {
          title,
          summary,
          content,
          createAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }),
          email: user?.email,
          uid: user?.uid,
          category
        })
  
        toast.success("게시글을 성공적으로 작성했습니다.")
        navigation('/')
      }
    } catch (e: any) {
      toast.error(e?.code)
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >) => {
    const { target : { name, value }} = e;

    if (name === 'title') {
      setTitle(value)
    }

    if (name === 'summary') {
      setSummary(value)
    }

    if (name === 'content') {
      setContent(value)
    }

    if (name === 'category') {
      setCategory(value as CategoryType)
    }
  };

  const getPostDetail = async (id:string) => {
    if(id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({id: docSnap.id, ...docSnap.data() as PostProps})
    }
  }

  useEffect(() => {
    if(params.id) getPostDetail(params?.id)
  }, [params?.id])

  useEffect(() => {
    if(post) {
      setTitle(post?.title)
      setSummary(post?.summary)
      setContent(post?.content)
      setCategory(post?.category as CategoryType)
    }
  }, [post])

  return (
    <div className="post__form">
      <div className="post__form__inner">

        <form className="form" onSubmit={onSubmit}>

          <div className="form__block">
            <label htmlFor="title">제목</label>
            <input 
              type='text'
              name="title" 
              id="title" 
              onChange={onChange}
              required 
              value={title}
            />
          </div>

          <div className="form__block">
            <label htmlFor="category">카테고리</label>
            <select 
              name='category' 
              id='category' 
              onChange={onChange}
              defaultValue="카테고리를 선택해 주세요."
            >
              <option value="">카테고리를 선택해 주세요.</option>
              {CATEGORIES?.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form__block">
            <label htmlFor="summary">요약</label>
            <input 
              type='text' 
              name="summary" 
              id="summary" 
              onChange={onChange}
              required 
              value={summary}
            />
          </div>

          <div className="form__block">
            <label htmlFor="content">내용</label>
            <textarea 
              name="content" 
              id="content" 
              onChange={onChange}
              value={content}
              required />
          </div>

          <div className="form__block">
            <input type='submit' value={post?.id ? '수정하기' : '제출하기'} className="form__btn--submit" />
          </div>

        </form>

      </div>
    </div>
  )
}

export default PostForm