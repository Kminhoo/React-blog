import { Link } from "react-router-dom"

import './Header.css'

const Header = () => {
  return (
    <header>
      <div className="header__inner">

        <h1 className="header__title">
          <Link to='/'>Blog</Link>
        </h1>

        <nav className="menu">
          <Link className="menu__item" to='/posts/new'>글쓰기</Link>
          <Link className="menu__item" to='/posts'>게시글</Link>
          <Link className="menu__item" to='/profile'>프로필</Link>
        </nav>

      </div>
    </header>
  )
}

export default Header