import { app } from "firebaseAPP"
import { getAuth, signOut } from "firebase/auth"

import { toast } from "react-toastify"

import './Profile.css'


const Profile = () => {

  const auth = getAuth(app)

  const onClick = async () => {
    try {
      await signOut(auth)
      toast.success("성공적으로 로그아웃 되었습니다.")
    } catch (error: any) {
      toast.error(error?.code)
      console.log(error)
    }
  }


  return (
    <div className="profile__box">
      <div className="profile__box__inner">

        <div className="profile__info">
          <div className="profile__image" />
          <div>
            <div className="profile__email">{auth?.currentUser?.email}</div>
            <div className="profile__name">{auth?.currentUser?.displayName || '개발자'}</div>
          </div>
        </div>

        <div 
          role='presentation' 
          className="profile__logout"
          onClick={onClick}
        >
          로그아웃
        </div>

      </div>
    </div>
  )
}

export default Profile


