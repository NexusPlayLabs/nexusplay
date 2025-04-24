import React from 'react'
import styled from 'styled-components'
import { Modal } from './Modal'

const ModalContainer = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1a1a1a;
  border-radius: 16px;
`

const Title = styled.h2`
  color: #ffffff;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
`

const Info = styled.p`
  color: #888;
  font-size: 14px;
  margin-top: 24px;
  text-align: center;
  max-width: 300px;
`

const ConnectButton = styled.button`
  background: ${(props) => props.bg || '#03ffa4'};
  color: ${(props) => props.text || '#000'};
  font-weight: bold;
  border: 2px solid #03ffa4;
  border-radius: 16px;
  padding: 14px 24px;
  margin: 10px 0;
  font-size: 16px;
  width: 100%;
  max-width: 280px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  box-shadow: 0 0 12px rgba(3, 255, 164, 0.3);

  &:hover {
    background: #02e294;
    box-shadow: 0 0 18px rgba(3, 255, 164, 0.5);
  }

  & img {
    width: 20px;
    height: 20px;
  }
`

export default function ConnectModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null

  return (
    <Modal onClose={onClose}>
      <ModalContainer>
        <Title>Connect</Title>
        <ConnectButton onClick={() => onSelect('twitter')}>
          <img src="/twitter_logo.png" alt="Twitter logo" />
          Connect with Twitter
        </ConnectButton>
        <ConnectButton onClick={() => onSelect('wallet')}>
          <img src="/wallet_logo.png" alt="Wallet logo" />
          Connect Wallet
        </ConnectButton>
        <Info>
          You only need to connect once to fully access the site.
        </Info>
      </ModalContainer>
    </Modal>
  )
}
