import './PostDetail.css'

const PostDetail = () => {
  return (
    <div className="post__detail">
      <div className="post__detail__inner">

        <div className="post__title">
          FireBase 란?
        </div>

        <div className="post__profile__box">
          <div className="post__profile"></div>
          <div className="post__author--name">작성자</div>
          <div className="post__date">2024.01.05 금요일</div>
        </div>

        <div className="post__utils__box">
          <div className="post__modify">수정</div>
          <div className="post__delete">삭제</div>
        </div>

        <div className="post__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna 
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
          ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit 
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
          occaecat cupidatat non proident, sunt in culpa qui officia 
          deserunt mollit anim id est laborum.
        </div>


      </div>
    </div>
  )
}

export default PostDetail