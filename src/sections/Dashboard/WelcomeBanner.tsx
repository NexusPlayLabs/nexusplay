import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import styled from 'styled-components'
import { useUserStore } from '../../hooks/useUserStore'

const Buttons = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  @media (min-width: 800px) {
    height: 100%;
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding-top: 0!important;
  }

  & > button {
    border: none;
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    background: #ffffffdf;
    transition: background-color .2s ease;
    color: black;
    cursor: pointer;
    &:hover {
      background: white;
    }
  }
`

const Welcome = styled.div`
  background-image: url('/welcome_background_final.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  min-height: 100vh; // výška okna zariadenia
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;

  & > div {
    display: none;
  }

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 40px;
  }
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
      <div>
        <h1>Welcome to NexusPlay Beta1 👋</h1>
        <p>
          A fair, simple and decentralized casino on Solana.
        </p>
      </div>
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
    </Welcome>
  )
}
