import React from 'react'
import styled from 'styled-components'
import { Modal } from './Modal'

const ModalContainer = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
`

const ConnectButton = styled.button`
  background: ${(props) => props.bg || '#555'};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  margin: 10px 0;
  font-size: 16px;
  width: 100%;
  max-width: 280px;
  cursor: pointer;
  transition: 0.2s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);

  &:hover {
    opacity: 0.9;
  }
`

export default function ConnectModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null

  return (
    <Modal onClose={onClose}>
      <ModalContainer>
        <Title>Connect</Title>
        <ConnectButton bg="#1DA1F2" onClick={() => onSelect('twitter')}>
          Connect with Twitter
        </ConnectButton>
        <ConnectButton bg="#00FFA3" onClick={() => onSelect('wallet')}>
          Connect Wallet
        </ConnectButton>
      </ModalContainer>
    </Modal>
  )
}
