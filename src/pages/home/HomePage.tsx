import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <header>
        <div className="header__inner">

          <h1 className="header__title">Blog</h1>

          <nav className="menu">
            <Link className="menu__item" to='/posts/new'>글쓰기</Link>
            <Link className="menu__item" to='/posts'>게시글</Link>
            <Link className="menu__item" to='/profile'>프로필</Link>
          </nav>

        </div>
      </header>

      <div className="post__list">
        <div className="post__list__inner">

          Post List

        </div>
      </div>

      <footer>
        <div className="footer__inner">

          <div>Menu1</div>
          <div>Menu2</div>
          <div>Menu3</div>

        </div>
      </footer>
    </>
  )
};

export default HomePage