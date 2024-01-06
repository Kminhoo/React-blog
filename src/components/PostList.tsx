import { useState } from "react"

import { Link } from "react-router-dom"

import './PostList.css'

interface postListPrors {
  hasNavigation? : boolean
}

type TabType = 'all' | "my"

const PostList = ({ hasNavigation = true }: postListPrors) => {

  const [activeTab, setActiveTab] = useState<TabType>('all')

  return (
  <>
    {hasNavigation && (
      <div className="post__navigation">
        <div 
          role='presentation' 
          onClick={() => setActiveTab('all')}
          className={activeTab === 'all' ? 'post__text--show' : ''}
        >전체 글</div>
        <div 
          role='presentation' 
          onClick={() => setActiveTab('my')}
          className={activeTab === 'my' ? 'post__text--show' : ''}
        >나의 글</div>
      </div>
    )}

    <div className="post__list">
      <div className="post__list__inner">

        {[...Array(10)].map((e, index) => (
          <div className="post__box" key={index}> {/* 키값을 주어야 하는이유 */}
            <Link to={`/posts/${index}`}>
              <div className="post__title">
                게시글 {index}
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

              <div className="post__profile__box">
                <div className="post__profile"></div>
                <div className="post__author--name">작성자</div>
                <div className="post__date">2024.01.05 금요일</div>
              </div>

              <div className="post__utils__box">
                <div className="post__modify">수정</div>
                <div className="post__delete">삭제</div>
              </div>
            </Link>
          </div>
        ))}

      </div>
    </div>
  </>  
  )
}

export default PostList