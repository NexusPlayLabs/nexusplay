import React from 'react'
import styled from 'styled-components'
import { Modal } from './Modal'
import { FaTwitter, FaWallet } from 'react-icons/fa'

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

const Info = styled.p`
  color: #ccc;
  font-size: 14px;
  margin-top: 16px;
  text-align: center;
`

const ConnectButton = styled.button`
  background: ${(props) => props.bg || '#555'};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  margin: 10px 0;
  font-size: 16px;
  width: 100%;
  max-width: 280px;
  cursor: pointer;
  transition: 0.2s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;

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
          <FaTwitter size={20} />
          Connect with Twitter
        </ConnectButton>
        <ConnectButton bg="#00FFA3" onClick={() => onSelect('wallet')}>
          <FaWallet size={20} />
          Connect Wallet
        </ConnectButton>
        <Info>
          You only need to connect once to fully access the site.
        </Info>
      </ModalContainer>
    </Modal>
  )
}
