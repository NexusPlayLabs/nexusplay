import React from 'react'
import styled from 'styled-components'
import { Modal } from './Modal'

const OptionButton = styled.button`
  background: ${props => props.color || '#93ec39'};
  color: #000;
  font-weight: 600;
  font-size: 16px;
  padding: 14px 24px;
  border-radius: 12px;
  width: 100%;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
`

const Title = styled.h2`
  color: white;
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
  font-weight: 700;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 24px;
  max-width: 320px;
`

export default function ConnectModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null

  return (
    <Modal onClose={onClose}>
      <Title>Connect</Title>
      <ButtonContainer>
        <OptionButton
          onClick={() => onSelect('twitter')}
          color="#1DA1F2"
        >
          Connect with Twitter
        </OptionButton>
        <OptionButton
          onClick={() => onSelect('wallet')}
          color="#03ffa4"
        >
          Connect Wallet
        </OptionButton>
      </ButtonContainer>
    </Modal>
  )
}
