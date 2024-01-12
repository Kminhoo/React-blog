import { useState, useContext } from 'react'

import AuthContext from "context/AuthContext"

import { useNavigate } from 'react-router-dom';

import { collection, addDoc } from "firebase/firestore"; 
import { db } from 'firebaseAPP';

import { toast } from 'react-toastify';

import './PostForm.css'


const PostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { user } = useContext(AuthContext)

  const navigation = useNavigate()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await addDoc(collection(db, 'posts'), {
        title,
        summary,
        content,
        createAt: new Date()?.toLocaleDateString(),
        email: user?.email
      })

      toast.success("게시글을 성공적으로 작성했습니다.")
      navigation('/')
    } catch (e: any) {
      toast.error(e?.code)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
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
  }

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
            <input type='submit' value='제출하기' className="form__btn--submit" />
          </div>

        </form>

      </div>
    </div>
  )
}

export default PostForm