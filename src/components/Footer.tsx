import { Link } from "react-router-dom"

import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footer__inner">

        <Link className="menu__item" to='/posts/new'>글쓰기</Link>
        <Link className="menu__item" to='/posts'>게시글</Link>
        <Link className="menu__item" to='/profile'>프로필</Link>

      </div>
    </footer>
  )
}

export default Footer