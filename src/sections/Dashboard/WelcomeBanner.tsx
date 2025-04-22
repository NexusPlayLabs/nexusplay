import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import styled from 'styled-components'
import { useUserStore } from '../../hooks/useUserStore'

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

  & > button {
    border: none;
    border-radius: 10px;
    padding: 8px 12px;
    font-size: 14px;
    background: #ffffffdf;
    color: black;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.2s ease;

    &:hover {
      background: white;
    }

    @media (max-width: 600px) {
      padding: 6px 10px;
      font-size: 13px;
    }
  }
`

const Welcome = styled.div`
  position: relative;
  width: 100%;
  height: 300px; // výška, ktorú chceš – pokojne uprav podľa potreby
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // alebo contain, ale cover je vizuálne čistejší
  }

  @media (max-width: 600px) {
    height: 250px; // menšia výška pre mobil, ak chceš
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
