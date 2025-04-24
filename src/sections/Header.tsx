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

// jednoduchý stub pre Twitter OAuth (nahradíš reálnou implementáciou)
async function twitterLogin(): Promise<{ name: string }> {
  // sem vlož svoj OAuth flow
  return new Promise((resolve) =>
    setTimeout(() => resolve({ name: '@tvoje_meno' }), 500)
  )
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
  const pool = useCurrentPool()
  const context = useGambaPlatformContext()
  const balance = useUserBalance()
  const { publicKey } = useWallet()
  const walletModal = useWalletModal()

  const [bonusHelp, setBonusHelp] = React.useState(false)
  const [jackpotHelp, setJackpotHelp] = React.useState(false)
  const [connectOpen, setConnectOpen] = React.useState(false)

  // nové stavy pre Twitter
  const [twitterConnected, setTwitterConnected] = React.useState(false)
  const [twitterUser, setTwitterUser] = React.useState<string | null>(null)

  const handleConnectSelect = async (method: 'twitter' | 'wallet') => {
    if (method === 'twitter') {
      // 1) zavoláme Twitter OAuth
      try {
        const user = await twitterLogin()
        setTwitterConnected(true)
        setTwitterUser(user.name)
        // nechaj modal otvorený, aby sme mohli hneď pripojiť wallet
      } catch (err) {
        console.error('Twitter login error', err)
      }
    } else {
      // pripojenie walletky je povolené len keď už je Twitter pripojený
      if (!twitterConnected) {
        alert('Najprv sa prosím pripojte na Twitter')
        return
      }
      setConnectOpen(false)
      walletModal.setVisible(true)
    }
  }

  const shortAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}…${publicKey.toBase58().slice(-4)}`
    : null

  return (
    <>
      {/* tvoja existujúca logika modalov Bonus a Jackpot */}
      <StyledHeader>
        {/* tvoj existujúci header */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* ... */}
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
