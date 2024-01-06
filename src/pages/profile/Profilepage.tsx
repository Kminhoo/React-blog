import Header from "components/Header"
import Profile from "components/Profile"
import PostList from "components/PostList"
import Footer from "components/Footer"

const Profilepage = () => {
  return (
    <>
      <Header />
      <Profile />
      <PostList hasNavigation={false}/>
      <Footer />
    </>
  )
}

export default Profilepage