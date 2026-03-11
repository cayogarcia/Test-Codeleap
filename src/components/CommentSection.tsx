import { useState } from "react"

interface Props {
  postId: number
}

export default function CommentSection({ postId }: Props) {

  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<any[]>([])

  const handleComment = () => {

    const newComment = {
      id: Date.now(),
      username: localStorage.getItem("username"),
      content: comment,
      created_datetime: new Date().toISOString()
    }

    const updated = [...comments, newComment]

    setComments(updated)

    localStorage.setItem(
      `comments-${postId}`,
      JSON.stringify(updated)
    )

    setComment("")
  }

  return (
    <div>

      {comments.map((c) => (
        <p key={c.id}>
          <b>@{c.username}</b>: {c.content}
        </p>
      ))}

      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a reply..."
      />

      <button onClick={handleComment}>
        Reply
      </button>

    </div>
  )
}