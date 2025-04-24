import React, { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { GambaUi, useReferral } from 'gamba-react-ui-v2'
import { useUserStore } from '../hooks/useUserStore'
import { truncateString } from '../utils'
import { Modal } from '../components/Modal'
import { useToast } from '../hooks/useToast'
import ConnectModal from './ConnectModal'
import { PLATFORM_ALLOW_REFERRER_REMOVAL, PLATFORM_REFERRAL_FEE } from '../constants'

function UserModal() {
  const user = useUserStore()
  const wallet = useWallet()
  const toast = useToast()
  const walletModal = useWalletModal()
  const referral = useReferral()
  const [removing, setRemoving] = useState(false)

  const copyInvite = () => {
    try {
      referral.copyLinkToClipboard()
      toast({
        title: '📋 Copied to clipboard',
        description: 'Your referral code has been copied!',
      })
    } catch {
      walletModal.setVisible(true)
    }
  }

  const revokeInvite = async () => {
    try {
      setRemoving(true)
      await referral.removeReferral()
    } finally {
      setRemoving(false)
    }
  }

  return (
    <Modal onClose={() => user.set({ userModal: false })}>
      <h1>
        {truncateString(wallet.publicKey?.toString() ?? '', 6, 3)}
      </h1>
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', width: '100%', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', width: '100%' }}>
          <GambaUi.Button main onClick={copyInvite}>
            💸 Copy invite link
          </GambaUi.Button>
          <div style={{ opacity: '.8', fontSize: '80%' }}>
            Share your link with new users to earn {(PLATFORM_REFERRAL_FEE * 100)}% every time they play on this platform.
          </div>
        </div>
        {PLATFORM_ALLOW_REFERRER_REMOVAL && referral.recipient && (
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', width: '100%' }}>
            <GambaUi.Button disabled={removing} onClick={revokeInvite}>
              Revoke invite
            </GambaUi.Button>
            <div style={{ opacity: '.8', fontSize: '80%' }}>
              You were invited by <a target="_blank" href={`https://solscan.io/account/${referral.recipient.toString()}`} rel="noreferrer">{referral.recipient.toString()}</a>
            </div>
          </div>
        )}
        <GambaUi.Button onClick={() => wallet.disconnect()}>
          Disconnect
        </GambaUi.Button>
      </div>
    </Modal>
  )
}

export function UserButton() {
  const walletModal = useWalletModal()
  const wallet = useWallet()
  const user = useUserStore()
  const [showConnectModal, setShowConnectModal] = useState(false)

  const handleSelect = (method: 'wallet' | 'twitter') => {
    setShowConnectModal(false)
    if (method === 'wallet') {
      walletModal.setVisible(true)
    } else if (method === 'twitter') {
      console.log('TODO: Handle Twitter connect') // Môžeš neskôr implementovať Twitter OAuth
    }
  }

  return (
    <>
      {wallet.connected && user.userModal && <UserModal />}
      {wallet.connected ? (
        <div style={{ position: 'relative' }}>
          <GambaUi.Button onClick={() => user.set({ userModal: true })}>
            <div style={{ display: 'flex', gap: '.5em', alignItems: 'center' }}>
              <img src={wallet.wallet?.adapter.icon} height="20px" />
              {truncateString(wallet.publicKey?.toBase58(), 3)}
            </div>
          </GambaUi.Button>
        </div>
      ) : (
        <>
          <GambaUi.Button onClick={() => setShowConnectModal(true)} style={{ backgroundColor: '#93ec39', color: '#000' }}>
            Connect
          </GambaUi.Button>
          <ConnectModal
            isOpen={showConnectModal}
            onClose={() => setShowConnectModal(false)}
            onSelect={handleSelect}
          />
        </>
      )}
    </>
  )
}
