import { Link } from "react-router-dom"

import './LoginForm.css'


const LoginForm = () => {
  return (
    <div className='login'>
      <div className="login__inner">

        <h1 className="form__title">로그인</h1>

        <form action="/post" method="POST" className="form">

          <div className="form__block">
            <label htmlFor="email">이메일</label>
            <input type='email' name="email" id="email" required />
          </div>

          <div className="form__block">
            <label htmlFor="password">비밀번호</label>
            <input type='password' name="password" id="password" required />
          </div>

          <div className="form__block">
            계정이 없으신가요?
            <Link className="form__link" to='/signup'>회원가입</Link>
          </div>

          <div className="form__block">
            <input type='submit' value='로그인' className="form__btn--submit" />
          </div>

        </form>

      </div>
    </div>
  )
}

export default LoginForm