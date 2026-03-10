import { useState } from "react"
import styled from "styled-components"

interface Props {
  onRegister: (username: string) => void
}

export default function RegisterModal({ onRegister }: Props) {

  const [username, setUsername] = useState("")

  function handleRegister() {

    if (!username) return

    localStorage.setItem("username", username)

    onRegister(username)
  }

  return (
    <Overlay>

      <Modal>

        <Title>Welcome to CodeLeap network!</Title>

        <Label>Please enter your username</Label>

        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button
          disabled={!username}
          onClick={handleRegister}
        >
          ENTER
        </Button>

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

  display:flex;
  justify-content:center;
  align-items:center;

  background: rgba(0,0,0,0.4);
`

const Modal = styled.div`
  background:white;
  padding:30px;
  border-radius:8px;
  width:420px;

  display:flex;
  flex-direction:column;
  gap:15px;
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