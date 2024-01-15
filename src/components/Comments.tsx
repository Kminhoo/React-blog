import { useState, useContext } from "react";

import { db } from "firebaseAPP";
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

import AuthContext from "context/AuthContext";

import { CommentInterface, PostProps } from "./PostList";

import './Comments.css'
import { toast } from "react-toastify";


interface CommentsProps {
  post : PostProps,
  getPostDetail: (id: string) => void
}

const Comments = ({ post, getPostDetail }: CommentsProps) => {

  const [comment, setComment] = useState<string>("");
  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target: { name, value }} = e;

    if(name === "comment") setComment(value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if(post?.id) {
        const postRef = doc(db, 'posts', post.id)

        if(user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
            }),
          }

          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updateDated: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
            }),
          })

          await getPostDetail(post?.id)
        }
      }

      toast.success("댓글이 성공적으로 작성되었습니다.")
      setComment("")
    } catch (e: any) {
      console.log(e.code)
    }
  }

  const handleDeleteComment = async (data: CommentInterface) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?")

    if(confirm && post.id) {
      const commentRef = doc(db, 'posts', post.id)

      await updateDoc(commentRef, {
        comments: arrayRemove(data)
      })

      toast.success("댓글을 성공적으로 삭제 했습니다.")
      await getPostDetail(post.id)
    }
  }

  return (
    <div className="comments">

      <form className="comments__form" onSubmit={onSubmit}>
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea 
            id="comment" 
            name="comment" 
            required 
            value={comment}
            onChange={onChange}
          />
        </div>

        <div className="form__block form__block--reverse">
          <input className="form__block--submit" type='submit' value="제출"/>
        </div>
      </form>

      <div className="comments__list">
        {post?.
          comments?.
          slice(0).
          reverse().
          map((comment) => (
          <div key={comment.createAt} className="comment__box">
            <div className="comment__profile--box">
              <div className="comment__email">{comment?.email}</div>
              <div className="comment__date">{comment.createAt}</div>
              {comment.uid === user?.uid && (
                <div className="comment__delete" onClick={() => handleDeleteComment(comment)}>삭제</div>
              )}
            </div>
            <div className="comment__text">
              {comment?.content}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Comments