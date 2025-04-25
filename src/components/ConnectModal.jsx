import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Modal } from './Modal'

const Container = styled.div
  padding: 30px 20px;
  background: #1a1a1a;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;

  @media (max-width: 480px) {
    padding: 24px 16px;
    max-width: 90vw;
    border-radius: 12px;
  }


const Title = styled.h2
  color: #fff;
  font-size: 28px;
  margin-bottom: 24px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 22px;
    margin-bottom: 20px;
  }


const Info = styled.p
  color: #888;
  font-size: 14px;
  margin-top: 24px;
  text-align: center;
  max-width: 300px;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-top: 20px;
  }


const ConnectButton = styled.button
  background: ${(p) => p.bg || '#03ffa4'};
  color: ${(p) => p.text || '#000'};
  font-weight: bold;
  border: 2px solid ${(p) => p.border || '#03ffa4'};
  border-radius: 16px;
  padding: 14px 24px;
  margin: 10px 0;
  font-size: 16px;
  width: 100%;
  max-width: 280px;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};
  box-shadow: ${(p) =>
    p.disabled ? 'none' : '0 0 12px rgba(3, 255, 164, 0.3)'};

  &:hover {
    background: ${(p) => (p.disabled ? p.bg : '#02e294')};
    box-shadow: ${(p) =>
      p.disabled ? 'none' : '0 0 18px rgba(3, 255, 164, 0.5)'};
  }

  & img {
    width: 20px;
    height: 20px;
  }


const WALLET_DEEPLINKS = {
  phantom: 'https://phantom.app/ul/browse/https://www.nexusplay.fun',
  solflare: 'https://solflare.com/ul/v1/connect?redirect=https://www.nexusplay.fun',
  subwallet: 'subwallet://dapp?url=https://www.nexusplay.fun',
}

export default function ConnectModal({
  isOpen,
  onClose,
  onSelect,
  twitterConnected,
  twitterUser
}) {
  const [selectingWallet, setSelectingWallet] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState(null)

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  useEffect(() => {
    if (isMobile && selectedWallet) {
      const deeplink = WALLET_DEEPLINKS[selectedWallet]
      if (deeplink) {
        window.location.href = deeplink
      }
    }
  }, [selectedWallet])

  if (!isOpen) return null

  return (
    <Modal onClose={onClose}>
      <Container>
        <Title>Connect</Title>

        {selectingWallet ? (
          <>
            <ConnectButton onClick={() => setSelectedWallet('solflare')}>
              <img src="/solflare.svg" alt="Solflare" />
              Solflare
            </ConnectButton>

             <ConnectButton onClick={() => setSelectedWallet('phantom')}>
              <img src="/phantom.webp" alt="Phantom" />
              Phantom
            </ConnectButton>

            <ConnectButton onClick={() => setSelectedWallet('subwallet')}>
              <img src="/subwallet.jpeg" alt="SubWallet" style={{ borderRadius: '6px' }} />
              SubWallet
            </ConnectButton>

            <ConnectButton
              bg="#333"
              text="#aaa"
              border="#444"
              disabled
            >
              <img src="/metamask.png" alt="MetaMask" />
              MetaMask (Not Supported)
            </ConnectButton>
          </>
        ) : twitterConnected ? (
          <>
            <Info>
              Twitter pripojený ako <b>{twitterUser}</b>
            </Info>
            <ConnectButton
              bg="#00FFA3"
              onClick={() => {
                if (isMobile) {
                  setSelectingWallet(true)
                } else {
                  onSelect('wallet')
                }
              }}
            >
              <img src="/wallet_logo.png" alt="Wallet" />
              Connect Wallet
            </ConnectButton>
          </>
        ) : (
          <>
            <ConnectButton
              bg="#1DA1F2"
              text="#fff"
              onClick={() => onSelect('twitter')}
            >
              <img src="/twitter_logo.png" alt="Twitter" />
              Connect Twitter
            </ConnectButton>
            <ConnectButton
              bg="#00FFA3"
              onClick={() => {
                if (isMobile) {
                  setSelectingWallet(true)
                } else {
                  onSelect('wallet')
                }
              }}
            >
              <img src="/wallet_logo.png" alt="Wallet" />
              Connect Wallet
            </ConnectButton>
          </>
        )}

        <Info>
          Twitter connection is optional, but a wallet connection is required
          for full functionality.
        </Info>
      </Container>
    </Modal>
  )
}
