import { useState } from "react"
import styled from "styled-components"
import { useQueryClient } from "@tanstack/react-query"
import type { Post } from "../types/Post"
import DeleteModal from "./DeleteModal"
import EditModal from "./EditModal"
import { api } from "../services/api"

interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {

  const queryClient = useQueryClient()

  const username = localStorage.getItem("username")

  const isOwner = username === post.username

  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

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
          @{post.username}
        </Info>

        <Content>
          {post.content}
        </Content>

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
`

const Content = styled.div`
  padding:0 15px 15px 15px;
`