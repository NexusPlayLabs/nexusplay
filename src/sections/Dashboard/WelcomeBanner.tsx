import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import styled from 'styled-components'
import { useUserStore } from '../../hooks/useUserStore'

// IKONY
import { Gift, Send, MessageCircle } from 'lucide-react'

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;

  & > button {
    display: flex;
    align-items: center;
    gap: 8px;

    border: none;
    border-radius: 12px;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.9);
    color: #000;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.2s ease, transform 0.2s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      background: #fff;
      transform: translateY(-1px);
    }

    @media (max-width: 600px) {
      padding: 8px 12px;
      font-size: 13px;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }
`

const Welcome = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-height: 480px;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  padding: 20px;
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
          <button onClick={copyInvite}>
            <Gift /> Copy Invite
          </button>
          <button onClick={() => window.open('https://t.me/nexusplay_labs')}>
            <Send /> Telegram
          </button>
          <button onClick={() => window.open('https://discord.gg/HSTtFFwR', '_blank')}>
            <MessageCircle /> Discord
          </button>
        </Buttons>
      </Overlay>
    </Welcome>
  )
}
