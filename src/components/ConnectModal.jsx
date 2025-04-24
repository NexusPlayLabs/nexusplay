import React from 'react'
import styled from 'styled-components'
import { Modal } from './Modal' // používame tvoj existujúci Modal komponent

const OptionButton = styled.button`
  all: unset;
  background: #03ffa4;
  color: #003c00;
  font-weight: bold;
  text-align: center;
  padding: 12px 20px;
  border-radius: 12px;
  margin: 10px 0;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: white;
  }
`

const Title = styled.h2`
  color: white;
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
`

export default function ConnectModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null

  return (
    <Modal onClose={onClose}>
      <Title>Select connection method</Title>
      <OptionButton onClick={() => onSelect('twitter')}>
        Connect with Twitter
      </OptionButton>
      <OptionButton onClick={() => onSelect('wallet')}>
        Connect Wallet
      </OptionButton>
    </Modal>
  )
}
