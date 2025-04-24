import {
  GambaUi,
  TokenValue,
  useCurrentPool,
  useGambaPlatformContext,
  useUserBalance
} from 'gamba-react-ui-v2'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { PLATFORM_JACKPOT_FEE } from '../constants'
import TokenSelect from './TokenSelect'
import ConnectModal from '../components/ConnectModal'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useWallet }      from '@solana/wallet-adapter-react'
import { Modal }         from '../components/Modal'

// *** TU PRIDAJ SVOJ SKUTOČNÝ TWITTER OAuth FLOW ***
// Tento stub len simuluje prihlásenie:
async function twitterLogin(): Promise<{ name: string }> {
  return new Promise((res) => setTimeout(() => res({ name: '@tvoj_handle' }), 300))
}

const Bonus = styled.button`
  /* ... tvoj existujúci štýl ... */
`

const StyledHeader = styled.div`
  /* ... tvoj existujúci štýl ... */
`

const Logo = styled(NavLink)`
  /* ... tvoj existujúci štýl ... */
`

export default function Header() {
  const pool      = useCurrentPool()
  const context   = useGambaPlatformContext()
  const balance   = useUserBalance()
  const { publicKey } = useWallet()
  const walletModal  = useWalletModal()

  const [bonusHelp, setBonusHelp]       = React.useState(false)
  const [jackpotHelp, setJackpotHelp]   = React.useState(false)
  const [connectOpen, setConnectOpen]   = React.useState(false)

  // stavy pre Twitter
  const [twitterConnected, setTwitterConnected] = React.useState(false)
  const [twitterUser, setTwitterUser]           = React.useState<string | null>(null)

  const handleConnectSelect = async (method: 'twitter' | 'wallet') => {
    if (method === 'twitter') {
      // 1) zavoláme Twitter OAuth
      try {
        const user = await twitterLogin()
        setTwitterConnected(true)
        setTwitterUser(user.name)
        // neuzatváraj modal, nech vieš pripojiť wallet
      } catch (err) {
        console.error('Twitter login error', err)
      }
    } else {
      // 2) pripojenie walletky len ak už Twitter bol pripojený
      if (!twitterConnected) {
        alert('Najprv sa, prosím, pripojte cez Twitter')
        return
      }
      setConnectOpen(false)
      walletModal.setVisible(true)
    }
  }

  const shortAddress = publicKey
    ? `${publicKey.toBase58().slice(0,4)}…${publicKey.toBase58().slice(-4)}`
    : null

  return (
    <>
      {bonusHelp && (
        <Modal onClose={() => setBonusHelp(false)}>
          {/* tvoj modal BONUS */}
        </Modal>
      )}
      {jackpotHelp && (
        <Modal onClose={() => setJackpotHelp(false)}>
          {/* tvoj modal JACKPOT */}
        </Modal>
      )}

      <StyledHeader>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Logo to="/">
            <img alt="logo" src="/logo_casino.png" />
          </Logo>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {pool.jackpotBalance > 0 && (
            <Bonus onClick={() => setJackpotHelp(true)}>
              💰 <TokenValue amount={pool.jackpotBalance} />
            </Bonus>
          )}
          {balance.bonusBalance > 0 && (
            <Bonus onClick={() => setBonusHelp(true)}>
              ✨ <TokenValue amount={balance.bonusBalance} />
            </Bonus>
          )}
          <TokenSelect />
          <button
            onClick={() => !publicKey && setConnectOpen(true)}
            style={{
              padding: '6px 16px',
              borderRadius: 8,
              background: '#03ffa4',
              color: '#003c00',
              fontWeight: 'bold',
              cursor: 'pointer',
              minWidth: 120,
              textAlign: 'center',
            }}
          >
            {shortAddress || 'Connect'}
          </button>
        </div>
      </StyledHeader>

      <ConnectModal
        isOpen={connectOpen}
        onClose={() => setConnectOpen(false)}
        onSelect={handleConnectSelect}
        twitterConnected={twitterConnected}
        twitterUser={twitterUser}
      />
    </>
  )
}
