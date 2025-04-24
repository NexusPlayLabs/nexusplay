import React from 'react'
import styled from 'styled-components'
import { Modal } from './Modal'

const Container = styled.div`
  padding: 30px 20px;
  background: #1a1a1a;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`

const Title = styled.h2`
  color: #fff;
  font-size: 28px;
  margin-bottom: 24px;
  text-align: center;
`

const Info = styled.p`
  color: #888;
  font-size: 14px;
  margin-top: 24px;
  text-align: center;
  max-width: 300px;
`

const ConnectButton = styled.button<{ bg?: string; text?: string }>`
  background: ${(p) => p.bg || '#03ffa4'};
  color: ${(p) => p.text || '#000'};
  font-weight: bold;
  border: 2px solid #03ffa4;
  border-radius: 16px;
  padding: 14px 24px;
  margin: 10px 0;
  font-size: 16px;
  width: 100%;
  max-width: 280px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  transition: all 0.2s ease;
`

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelect: (method: 'twitter' | 'wallet') => void
  twitterConnected: boolean
  twitterUser: string | null
}

export default function ConnectModal({
  isOpen,
  onClose,
  onSelect,
  twitterConnected,
  twitterUser
}: Props) {
  if (!isOpen) return null

  return (
    <Modal onClose={onClose}>
      <Container>
        <Title>Connect</Title>

        {twitterConnected ? (
          <>
            <Info>Twitter pripojený ako <b>{twitterUser}</b></Info>
            <ConnectButton bg="#00FFA3" onClick={() => onSelect('wallet')}>
              <img src="/wallet_logo.png" alt="Wallet" />
              Connect Wallet
            </ConnectButton>
          </>
        ) : (
          <>
            <ConnectButton bg="#1DA1F2" text="#fff" onClick={() => onSelect('twitter')}>
              <img src="/twitter_logo.png" alt="Twitter" />
              Connect Twitter
            </ConnectButton>
            <ConnectButton bg="#00FFA3" onClick={() => onSelect('wallet')}>
              <img src="/wallet_logo.png" alt="Wallet" />
              Connect Wallet
            </ConnectButton>
          </>
        )}

        <Info>
          Twitter pripojenie je voliteľné, no pre plné použitie je potrebné pripojiť aj peňaženku.
        </Info>
      </Container>
    </Modal>
  )
}
