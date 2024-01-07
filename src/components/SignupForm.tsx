import { Link } from "react-router-dom"

import './SignupForm.css'

const SignupForm = () => {
  return (
    <div className='signup'>
      <div className="signup__inner">

        <h1 className="form__title">회원가입</h1>

        <form action="/post" method="POST" className='form'>

          <div className="form__block">
            <label htmlFor="email">이메일</label>
            <input type='email' name="email" id="email" required />
          </div>

          <div className="form__block">
            <label htmlFor="passward">비밀번호</label>
            <input type='passward' name="passward" id="passward" required />
          </div>

          <div className="form__block">
            <label htmlFor="passward">비밀번호 확인</label>
            <input type='passward' name="passward_check" id="passward-check" required />
          </div>

          <div className="form__block">
            계정이 이미 있으신가요?
            <Link className="form__link" to='/login'>로그인 하기</Link>
          </div>

          <div className="form__block">
            <input type='submit' value='회원가입' className="form__btn--submit" />
          </div>

        </form>

      </div>
    </div>
  )
}

export default SignupForm