import { useState, useEffect } from "react"
import styled from "styled-components"
import type { Post } from "../types/Post"

interface Props {
  isOpen: boolean
  post: Post | null
  onClose: () => void
  onSave: (title: string, content: string) => void
}

export default function EditModal({ isOpen, post, onClose, onSave }: Props) {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
    }
  }, [post])

  if (!isOpen || !post) return null

  function handleSave() {
    onSave(title, content)
    onClose()
  }

  return (
    <Overlay>

      <Modal>

        <Title>Edit item</Title>

        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Label>Content</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Buttons>

          <CancelButton onClick={onClose}>
            Cancel
          </CancelButton>

          <SaveButton onClick={handleSave}>
            Save
          </SaveButton>

        </Buttons>

      </Modal>

    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;

  background: rgba(0,0,0,0.4);

  display:flex;
  justify-content:center;
  align-items:center;
  
  z-index:9999;
`

const Modal = styled.div`
  background:white;
  padding:25px;
  border-radius:8px;
  width:400px;

  display:flex;
  flex-direction:column;
  gap:10px;
`

const Title = styled.h3`
  margin-bottom:10px;
`

const Label = styled.label`
  font-size:14px;
`

const Input = styled.input`
  padding:8px;
  border:1px solid #ccc;
  border-radius:4px;
`

const Textarea = styled.textarea`
  padding:8px;
  border:1px solid #ccc;
  border-radius:4px;
  min-height:80px;
`

const Buttons = styled.div`
  display:flex;
  justify-content:flex-end;
  gap:10px;
  margin-top:10px;
`

const CancelButton = styled.button`
  padding:8px 15px;
  border:1px solid gray;
  background:white;
  cursor:pointer;
`

const SaveButton = styled.button`
  padding:8px 15px;
  border:none;
  background:#47B960;
  color:white;
  cursor:pointer;
`