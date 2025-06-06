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
    gap: 6px;

    background: rgba(255, 255, 255, 0.85);
    border: 2px solid transparent;
    border-radius: 10px;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 500;
    color: #111;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 130px;
    max-width: 180px;

    &:hover {
      background: white;
      border-color: #999;
    }

    @media (max-width: 600px) {
      padding: 4px 8px;
      font-size: 11px;
      min-width: 90px;
      max-width: 100px;
      flex: 1 1 0;
    }
  }

  @media (max-width: 600px) {
    gap: 6px;
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

  @media (max-width: 600px) {
    height: auto;           /* dôležité! výška podľa obrázka */
    align-items: center;    /* centrovanie obsahu vertikálne */
    padding-top: 25px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    border-radius: 20px;

    @media (max-width: 600px) {
      object-fit: contain;
      height: auto;
      max-height: 100%;
    }
  }
`

const Overlay = styled.div`
  position: absolute;
  bottom: 24px; /* ← posunú nižšie na spodok obrázka */
  left: 0;
  z-index: 2;
  width: 100%;
  padding: 0 24px; /* iba do strán, nie hore-dole */
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  flex-wrap: wrap;

  @media (min-width: 601px) {
    bottom: 24px;
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
