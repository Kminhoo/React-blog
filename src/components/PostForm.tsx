import './PostForm.css'

const PostForm = () => {
  return (
    <div className="post__form">
      <div className="post__form__inner">

        <form action="/post" method="POST" className="form">

          <div className="form__block">
            <label htmlFor="title">제목</label>
            <input type='text' name="title" id="title" required />
          </div>

          <div className="form__block">
            <label htmlFor="summary">요약</label>
            <input type='text' name="summary" id="summary" required />
          </div>

          <div className="form__block">
            <label htmlFor="content">내용</label>
            <textarea name="content" id="content" required />
          </div>

          <div className="form__block">
            <input type='submit' value='제출하기' className="form__btn--submit" />
          </div>

        </form>

      </div>
    </div>
  )
}

export default PostForm