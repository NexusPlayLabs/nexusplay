import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import styled from 'styled-components'
import { useUserStore } from '../../hooks/useUserStore'

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  & > button {
    border: none;
    border-radius: 10px;
    padding: 10px 15px;
    background: #ffffffdf;
    color: black;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color .2s ease;

    &:hover {
      background: white;
    }
  }
`

const Welcome = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-height: 600px; // alebo výšku, ktorú chceš
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    object-fit: cover; // alebo "contain" ak chceš celé proporcie
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
            💸 Copy Invite
          </button>
          <button onClick={() => window.open('https://t.me/nexusplay_labs')}>
            🚀 Telegram
          </button>
          <button onClick={() => window.open('https://discord.gg/HSTtFFwR', '_blank')}>
            💬 Discord
          </button>
        </Buttons>
      </Overlay>
    </Welcome>
  )
}
