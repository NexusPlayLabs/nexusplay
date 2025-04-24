import React, { useState } from 'react'
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

const ConnectButton = styled.button`
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

const wallets = [
  { name: 'Phantom', icon: '/phantom.png', link: 'https://phantom.app/ul/browse' },
  { name: 'Solflare', icon: '/solflare.png', link: 'https://solflare.com/ul/connect' },
  { name: 'MetaMask', icon: '/metamask.png', link: 'https://metamask.app.link/' },
  { name: 'SubWallet', icon: '/subwallet.png', link: 'https://subwallet.app/ul/connect' },
]

export default function ConnectModal({
  isOpen,
  onClose,
  onSelect,
  twitterConnected,
  twitterUser
}) {
  const [selectingWallet, setSelectingWallet] = useState(false)

  if (!isOpen) return null

  const handleWalletClick = (wallet) => {
    // otvorenie deep linku len na mobilných zariadeniach
    if (window.innerWidth < 768 && wallet.link) {
      window.open(wallet.link, '_blank')
    }
    onSelect('wallet')
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <Container>
        <Title>Connect</Title>

        {!selectingWallet ? (
          <>
            {!twitterConnected ? (
              <ConnectButton bg="#1DA1F2" text="#fff" onClick={() => onSelect('twitter')}>
                <img src="/twitter_logo.png" alt="Twitter" />
                Connect Twitter
              </ConnectButton>
            ) : (
              <Info>Twitter pripojený ako <b>{twitterUser}</b></Info>
            )}

            <ConnectButton bg="#00FFA3" onClick={() => setSelectingWallet(true)}>
              <img src="/wallet_logo.png" alt="Wallet" />
              Connect Wallet
            </ConnectButton>
          </>
        ) : (
          wallets.map((wallet) => (
            <ConnectButton key={wallet.name} onClick={() => handleWalletClick(wallet)}>
              <img src={wallet.icon} alt={wallet.name} />
              {wallet.name}
            </ConnectButton>
          ))
        )}

        <Info>
          Twitter pripojenie je voliteľné, no pre plné použitie je potrebné pripojiť aj peňaženku.
        </Info>
      </Container>
    </Modal>
  )
}
