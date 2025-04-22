import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import styled from 'styled-components'
import { useUserStore } from '../../hooks/useUserStore'

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    background: rgba(255, 255, 255, 0.85);
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 10px 16px;
    font-size: 15px;
    font-weight: 500;
    color: #111;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 140px;
    max-width: 200px;

    &:hover {
      background: white;
      border-color: #999;
    }

    @media (max-width: 600px) {
      padding: 6px 10px;
      font-size: 13px;
      min-width: auto;
      max-width: 100px;
      flex: 1 1 0;
    }
  }

  @media (max-width: 600px) {
    gap: 8px;
    justify-content: center;
  }
`

const Welcome = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;

  @media (max-width: 600px) {
    object-fit: cover; /* viac zoomnuté */
    object-position: center center; /* zameranie na stred */
  }
}
`

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  flex-wrap: wrap;
`

export function WelcomeBanner() {
  const wallet = useWallet()
  const walletModal = useWalletModal()
  const store = useUserStore()

  const copyInvite = () => {
    store.set({ userModal: true })
    if (!wallet.connected) {
      walletModal.setVisible(true)
    }
  }

  return (
    <Welcome>
      <img src="/welcome_backgorund.png" alt="Welcome background" />
      <Overlay>
        <Buttons>
          <button onClick={copyInvite}>💸 Copy Invite</button>
          <button onClick={() => window.open('https://t.me/nexusplay_labs', '_blank')}>📲 Telegram</button>
          <button onClick={() => window.open('https://discord.gg/HSTtFFwR', '_blank')}>💬 Discord</button>
        </Buttons>
      </Overlay>
    </Welcome>
  )
}
