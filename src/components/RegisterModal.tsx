import { useState } from "react"
import styled from "styled-components"

interface Props {
  onEnter: (username: string) => void
}

export default function RegisterModal({ onEnter }: Props) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleEnter() {

    if (!username || !password) return

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.")
      return
    }

    localStorage.setItem("username", username)
    localStorage.setItem("password", password)

    onEnter(username)
  }

  return (

    <Overlay>

      <Modal>

        <Title>
          Welcome to CodeLeap Network!
        </Title>

        <Label>Username</Label>

        <Input
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Label>Password</Label>

        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          disabled={!username || !password}
          onClick={handleEnter}
        >
          ENTER
        </Button>

      </Modal>

    </Overlay>
  )
}

const Overlay = styled.div`
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;

  background:rgba(0,0,0,0.6);

  display:flex;
  justify-content:center;
  align-items:center;
`

const Modal = styled.div`
  background:white;
  padding:30px;
  border-radius:8px;
  width:400px;

  display:flex;
  flex-direction:column;
  gap:10px;
`

const Title = styled.h2`
  margin:0 0 10px 0;
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
  margin-top:10px;

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