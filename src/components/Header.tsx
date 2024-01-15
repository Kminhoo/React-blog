import { useContext } from "react";

import { Link } from "react-router-dom"

import { BsSun, BsMoon } from "react-icons/bs";

import ThemeContext from "context/ThemeContext";

import './Header.css'


const Header = () => {
  const themeContext = useContext(ThemeContext);

  console.log(themeContext)

  return (
    <header>
      <div className="header__inner">

        <h1 className="header__title">
          <Link className="header__logo" to='/'>Blog</Link>
        </h1>

        <div>
          <>
          {themeContext.theme === 'light' 
            ? <BsSun 
              className="header__theme--btn"
              onClick={themeContext.toggleMode} 
              /> 
            : <BsMoon 
              className="header__theme--btn"
              onClick={themeContext.toggleMode} 
              />
            }
          </>
          
          <nav className="menu">
            <Link className="menu__item" to='/posts/new'>글쓰기</Link>
            <Link className="menu__item" to='/posts'>게시글</Link>
            <Link className="menu__item" to='/profile'>프로필</Link>
          </nav>
        </div>


      </div>
    </header>
  )
}

export default Header