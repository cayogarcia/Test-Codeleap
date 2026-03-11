import { useState } from "react"
import styled from "styled-components"
import { useQueryClient } from "@tanstack/react-query"
import type { Post } from "../types/Post"
import DeleteModal from "./DeleteModal"
import EditModal from "./EditModal"
import { api } from "../services/api"
import { formatDistanceToNow } from "date-fns"

interface Props {
  post: Post
}

interface Reply {
  id: number
  username: string
  text: string
}

export default function PostCard({ post }: Props) {

  const queryClient = useQueryClient()

  const username = localStorage.getItem("username") || "User"

  const isOwner = username === post.username

  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyText, setReplyText] = useState("")

  const [replies, setReplies] = useState<Reply[]>([])

  const [likes, setLikes] = useState<number>(() => {
    const stored = localStorage.getItem(`likes-${post.id}`)
    return stored ? Number(stored) : 0
  })

  const timeAgo = formatDistanceToNow(
    new Date(post.created_datetime),
    { addSuffix: true }
  )

  async function handleDelete() {

    await api.delete(`/careers/${post.id}/`)

    queryClient.invalidateQueries({ queryKey: ["posts"] })

    setOpenDelete(false)
  }

  async function handleEdit(title: string, content: string) {

    await api.patch(`/careers/${post.id}/`, {
      title,
      content
    })

    queryClient.invalidateQueries({ queryKey: ["posts"] })

    setOpenEdit(false)
  }

  function handleLike() {

    const newLikes = likes + 1

    setLikes(newLikes)

    localStorage.setItem(`likes-${post.id}`, String(newLikes))
  }

  function handleReply() {

    if (!replyText.trim()) return

    const newReply: Reply = {
      id: Date.now(),
      username: username,
      text: replyText
    }

    setReplies([...replies, newReply])

    setReplyText("")
    setShowReplyInput(false)
  }

  return (
    <>
      <Container>

        <Header>

          <Title>{post.title}</Title>

          {isOwner && (
            <Actions>

              <button onClick={() => setOpenDelete(true)}>
                🗑
              </button>

              <button onClick={() => setOpenEdit(true)}>
                ✏
              </button>

            </Actions>
          )}

        </Header>

        <Info>

          <UserSection>

            <Avatar>
              {post.username[0].toUpperCase()}
            </Avatar>

            <User>@{post.username}</User>

          </UserSection>

          <Time>{timeAgo}</Time>

        </Info>

        <Content>
          {post.content}
        </Content>

        <Footer>

          <ActionBar>

            <LikeButton onClick={handleLike}>
              ❤️ {likes}
            </LikeButton>

            <ReplyButton onClick={() => setShowReplyInput(!showReplyInput)}>
              ↩ Reply
            </ReplyButton>

          </ActionBar>

        </Footer>

        {showReplyInput && (

          <ReplyBox>

            <ReplyInput
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />

            <SendButton onClick={handleReply}>
              Send
            </SendButton>

          </ReplyBox>

        )}

        {replies.length > 0 && (

          <RepliesContainer>

            {replies.map((reply) => (

              <ReplyItem key={reply.id}>

                <ReplyAvatar>
                  {reply.username[0].toUpperCase()}
                </ReplyAvatar>

                <ReplyContent>

                  <ReplyUser>@{reply.username}</ReplyUser>

                  <ReplyText>{reply.text}</ReplyText>

                </ReplyContent>

              </ReplyItem>

            ))}

          </RepliesContainer>

        )}

      </Container>

      <DeleteModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />

      <EditModal
        isOpen={openEdit}
        post={post}
        onClose={() => setOpenEdit(false)}
        onSave={handleEdit}
      />

    </>
  )
}

const Container = styled.div`
  background:white;
  border-radius:8px;
  margin-top:20px;
  overflow:hidden;
`

const Header = styled.div`
  background:#7695EC;
  color:white;
  padding:15px;

  display:flex;
  justify-content:space-between;
  align-items:center;
`

const Title = styled.h3`
  margin:0;
`

const Actions = styled.div`
  display:flex;
  gap:10px;

  button{
    background:none;
    border:none;
    color:white;
    cursor:pointer;
    font-size:18px;
  }
`

const Info = styled.div`
  padding:10px 15px;
  font-size:14px;
  color:gray;

  display:flex;
  justify-content:space-between;
`

const UserSection = styled.div`
  display:flex;
  align-items:center;
  gap:10px;
`

const Avatar = styled.div`
  width:32px;
  height:32px;

  border-radius:50%;

  background:#7695EC;
  color:white;

  display:flex;
  align-items:center;
  justify-content:center;

  font-weight:bold;
`

const User = styled.span`
  font-weight:bold;
`

const Time = styled.span`
  font-size:12px;
`

const Content = styled.div`
  padding:0 15px 15px 15px;
`

const Footer = styled.div`
  padding:10px 15px;
`

const ActionBar = styled.div`
  display:flex;
  gap:20px;
`

const LikeButton = styled.button`
  border:none;
  background:none;
  cursor:pointer;
  font-size:16px;
`

const ReplyButton = styled.button`
  border:none;
  background:none;
  cursor:pointer;
  font-size:16px;
`

const ReplyBox = styled.div`
  display:flex;
  gap:10px;
  padding:10px 15px;
`

const ReplyInput = styled.input`
  flex:1;
  padding:8px;
  border:1px solid #ccc;
  border-radius:6px;
`

const SendButton = styled.button`
  padding:8px 16px;
  border:none;
  border-radius:6px;
  background:#7695EC;
  color:white;
  cursor:pointer;
`

const RepliesContainer = styled.div`
  padding:10px 15px;
`

const ReplyItem = styled.div`
  display:flex;
  gap:10px;
  margin-top:10px;
`

const ReplyAvatar = styled.div`
  width:28px;
  height:28px;
  border-radius:50%;
  background:#7695EC;
  color:white;

  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:bold;
`

const ReplyContent = styled.div`
  background:#f3f3f3;
  padding:8px 12px;
  border-radius:6px;
`

const ReplyUser = styled.div`
  font-weight:bold;
  font-size:13px;
`

const ReplyText = styled.div`
  font-size:14px;
`