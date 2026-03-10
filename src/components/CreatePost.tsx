import { useState } from "react"
import styled from "styled-components"
import { api } from "../services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function CreatePost() {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const queryClient = useQueryClient()

  const mutation = useMutation({
  mutationFn: async () => {

    const username = localStorage.getItem("username")

    return api.post("/careers/", {
      username,
      title,
      content
    })

  },

  onSuccess: () => {

    queryClient.invalidateQueries({
      queryKey: ["posts"]
    })

    setTitle("")
    setContent("")
  }
})

  const handleCreate = () => {

    if (!title || !content) return

    mutation.mutate()
  }

  return (
    <Container>

      <Title>What's on your mind?</Title>

      <Label>Title</Label>

      <Input
        placeholder="Hello world"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Label>Content</Label>

      <Textarea
        placeholder="Content here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button
        disabled={!title || !content}
        onClick={handleCreate}
      >
        CREATE
      </Button>

    </Container>
  )
}

const Container = styled.div`
  background:white;
  padding:20px;
  border-radius:8px;
  display:flex;
  flex-direction:column;
  gap:10px;
`

const Title = styled.h2`
  margin:0;
`

const Label = styled.label`
  font-size:14px;
`

const Input = styled.input`
  padding:10px;
  border:1px solid #ccc;
  border-radius:6px;
`

const Textarea = styled.textarea`
  padding:10px;
  border:1px solid #ccc;
  border-radius:6px;
  min-height:100px;
`

const Button = styled.button`
  align-self:flex-end;
  padding:10px 20px;

  border:none;
  border-radius:6px;

  background:#7695EC;
  color:white;
  font-weight:bold;

  cursor:pointer;

  &:disabled{
    background:#ccc;
    cursor:not-allowed;
  }
`