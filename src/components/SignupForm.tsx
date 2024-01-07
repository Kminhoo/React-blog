import React, { useState } from "react"

import { Link } from "react-router-dom"

import { app } from "firebaseAPP"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

import './SignupForm.css'

import { toast } from "react-toastify"

const SignupForm = () => {
  const [error, setError] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordCheck, setPasswordCheck] = useState<string>("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const auth = getAuth(app)
      await createUserWithEmailAndPassword(auth, email, password)

      toast.success('🦄 회원가입에 성공 했습니다.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error: any) {
      toast.error(error?.code)
    }
  }

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { target : { name, value } } = e;

    if (name === 'email') {
      setEmail(value)
      const vaildRegex = 
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!value?.match(vaildRegex)) {
        setError("이메일 형식이 올바르지 않습니다.")
      } else {
        setError("")
      }
    } 

    if (name === 'password') {
      setPassword(value)
      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상이어야 합니다.")
      } else if (passwordCheck?.length > 0 && value !== passwordCheck) {
        setError("비밀번호가 같지 않습니다.")
      } else {
        setError("")
      }
    }

    if (name === 'password_check') {
      setPasswordCheck(value)
      if (password !== passwordCheck) {
        setError("비밀번호가 같지 않습니다.")
      } else {
        setError("")
      }
    }
  }


  return (
    <div className='signup'>
      <div className="signup__inner">

        <h1 className="form__title">회원가입</h1>

        <form onSubmit={onSubmit} className='form'>

          <div className="form__block">
            <label htmlFor="email">이메일</label>
            <input type='email' name="email" id="email" required onChange={onChange}/>
          </div>

          <div className="form__block">
            <label htmlFor="password">비밀번호</label>
            <input type='password' name="password" id="password" required onChange={onChange}/>
          </div>

          <div className="form__block">
            <label htmlFor="password">비밀번호 확인</label>
            <input type='password' name="password_check" id="password_check" required onChange={onChange}/>
          </div>

          {error && error?.length > 0 && (
            <div className="form__block">
              <div className="form__error">{error}</div>
            </div>
          )}

          <div className="form__block">
            계정이 이미 있으신가요?
            <Link className="form__link" to='/login'>로그인 하기</Link>
          </div>

          <div className="form__block">
            <input 
              type='submit' 
              value='회원가입' 
              className="form__btn--submit" 
              disabled={error?.length > 0}
            />
          </div>

        </form>

      </div>
    </div>
  )
}

export default SignupForm