import React, { useState } from "react"

import { Link, useNavigate } from "react-router-dom"

import { toast } from "react-toastify"

import { app } from "firebaseAPP"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

import './LoginForm.css'


const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigaiton = useNavigate()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const auth = getAuth(app)
      await signInWithEmailAndPassword(auth, email, password)
  
      toast.success('🦄 로그인에 성공 했습니다.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigaiton('/')
    } catch (error: any) {
      toast.error(error?.code)
      console.log(error)
    }
  }

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { target : { name, value } } = e

    if (name === "email") {
      setEmail(value)
      const vaildRegex = 
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!value?.match(vaildRegex)) {
        setError("이메일 형식이 올바르지 않습니다.")
      } else {
        setError("")
      }
    }

    if(name === "password") {
      setPassword(value)

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상이어야 합니다.")
      } else {
        setError("")
      }
    }
  }



  return (
    <div className='login'>
      <div className="login__inner">

        <h1 className="form__title">로그인</h1>

        <form className="form" onSubmit={onSubmit}>

          <div className="form__block">
            <label htmlFor="email">이메일</label>
            <input 
              type='email' 
              name="email" 
              id="email" 
              required 
              onChange={onChange}
              value={email}
            />
          </div>

          <div className="form__block">
            <label htmlFor="password">비밀번호</label>
            <input 
              type='password' 
              name="password" 
              id="password" 
              required 
              onChange={onChange}
              value={password}
            />
          </div>

          {error && error.length > 0 && (
            <div className="form__block">
              <div className="form__error">{error}</div>
            </div>
          )}

          <div className="form__block">
            계정이 없으신가요?
            <Link className="form__link" to='/signup'>회원가입</Link>
          </div>

          <div className="form__block">
            <input 
              type='submit' 
              value='로그인' 
              className="form__btn--submit"
              disabled={error?.length > 0}
            />
          </div>

        </form>

      </div>
    </div>
  )
}

export default LoginForm