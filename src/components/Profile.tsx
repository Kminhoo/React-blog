import { Link } from "react-router-dom"

import './Profile.css'

const Profile = () => {
  return (
    <div className="profile__box">
      <div className="profile__box__inner">

        <div className="profile__info">
          <div className="profile__image" />
          <div>
            <div className="profile__email">whdgus4158@gamil.com</div>
            <div className="profile__name">김민후</div>
          </div>
        </div>

        <Link to="/" className="profile__logout">
          로그아웃
        </Link>

      </div>
    </div>
  )
}

export default Profile