import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import styled from 'styled-components'
import { useUserStore } from '../../hooks/useUserStore'

import { Tag, Send, MessageCircle } from 'lucide-react'

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;

  & > button {
    display: flex;
    align-items: center;
    gap: 6px;
    border: none;
    border-radius: 9999px;
    padding: 8px 16px;
    font-size: 14px;
    background: linear-gradient(145deg, #c8ffc8, #e6ffe6);
    color: #1e1e1e;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;

    &:hover {
      background: #ffffff;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    svg {
      width: 16px;
      height: 16px;
    }

    @media (max-width: 600px) {
      padding: 6px 12px;
      font-size: 13px;
    }
  }
`

const Welcome = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-height: 500px;
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
  gap: 10px;
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
            <Tag /> Copy Invite
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
