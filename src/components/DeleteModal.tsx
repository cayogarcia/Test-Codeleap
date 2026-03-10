import styled from "styled-components"

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteModal({ isOpen, onClose, onConfirm }: Props) {

  if (!isOpen) return null

  return (
    <Overlay>

      <Modal>

        <Title>
          Are you sure you want to delete this item?
        </Title>

        <Buttons>

          <CancelButton onClick={onClose}>
            Cancel
          </CancelButton>

          <DeleteButton onClick={onConfirm}>
            Delete
          </DeleteButton>

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
`

const Modal = styled.div`
  background:white;
  padding:25px;
  border-radius:8px;
  width:400px;
`

const Title = styled.h3`
  margin-bottom:20px;
`

const Buttons = styled.div`
  display:flex;
  justify-content:flex-end;
  gap:10px;
`

const CancelButton = styled.button`
  padding:8px 15px;
  border:1px solid gray;
  background:white;
  cursor:pointer;
`

const DeleteButton = styled.button`
  padding:8px 15px;
  border:none;
  background:#FF5151;
  color:white;
  cursor:pointer;
`