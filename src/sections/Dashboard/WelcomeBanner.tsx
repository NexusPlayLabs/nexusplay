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

    &:hover {
      background: white;
      border-color: #999;
    }

    @media (max-width: 600px) {
      font-size: 14px;
      padding: 8px 14px;
    }
  }
`

const Welcome = styled.div`
  position: relative;
  width: 100%;
  max-height: 450px;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
   
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center top;
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
