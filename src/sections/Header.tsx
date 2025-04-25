import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import {
  GambaUi,
  TokenValue,
  useCurrentPool,
  useGambaPlatformContext,
  useUserBalance
} from 'gamba-react-ui-v2'
import TokenSelect from './TokenSelect'
import ConnectModal from '../components/ConnectModal'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { Modal } from '../components/Modal'
import { PLATFORM_JACKPOT_FEE } from '../constants'

const Bonus = styled.button`
  all: unset;
  cursor: pointer;
  color: ${'#003c00'};
  border-radius: 10px;
  background: ${'#03ffa4'};
  padding: 2px 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover { background: white; }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background: #000000cc;
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`

const Logo = styled(NavLink)`
  height: auto;
  width: 100%;
  max-width: 200px;
  margin: 0 10px;

  & > img {
    width: 100%;
    height: auto;
  }
`

export default function Header() {
  const pool = useCurrentPool()
  const context = useGambaPlatformContext()
  const balance = useUserBalance()
  const { publicKey } = useWallet()
  const [bonusHelp, setBonusHelp] = React.useState(false)
  const [jackpotHelp, setJackpotHelp] = React.useState(false)
  const [connectOpen, setConnectOpen] = React.useState(false)
  const walletModal = useWalletModal()

  const handleConnectSelect = (method: string) => {
    setConnectOpen(false)
    if (method === 'twitter') {
      // TODO: integruj Twitter OAuth
    } else if (method === 'wallet') {
      walletModal.setVisible(true)
    }
  }

  const shortAddress = publicKey
    ? `${publicKey.toBase58().slice(0,4)}…${publicKey.toBase58().slice(-4)}`
    : null

  return (
    <>
      {/* Bonus Modal */}
      {bonusHelp && (
        <Modal onClose={() => setBonusHelp(false)}>
          <h1>Bonus ✨</h1>
          <p>
            Máš <b><TokenValue amount={balance.bonusBalance} /></b> zadarmo.
            Tento bonus sa automaticky použije pri hre.
          </p>
          <p>Poznámka: Na transakciu je stále potrebný poplatok z peňaženky.</p>
        </Modal>
      )}

      {/* Jackpot Modal */}
      {jackpotHelp && (
        <Modal onClose={() => setJackpotHelp(false)}>
          <h1>Jackpot 💰</h1>
          <p style={{ fontWeight: 'bold' }}>
            V jackpot-e je <TokenValue amount={pool.jackpotBalance} />.
          </p>
          <p>Jackpot rastie s každou stávkou a po výhře sa resetuje.</p>
          <p>
            Maximálny poplatok na stávku: {(PLATFORM_JACKPOT_FEE * 100).toFixed(2)}%
          </p>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {context.defaultJackpotFee === 0 ? 'VYPNUTÉ' : 'ZAPNUTÉ'}
            <GambaUi.Switch
              checked={context.defaultJackpotFee > 0}
              onChange={(checked) =>
                context.setDefaultJackpotFee(checked ? PLATFORM_JACKPOT_FEE : 0)
              }
            />
          </label>
        </Modal>
      )}

      <StyledHeader>
        <Logo to="/">
          <img src="/logo_casino.png" alt="NexusPlay logo" />
        </Logo>

        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
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
        twitterConnected={false /* alebo tvoj stav */}
        twitterUser={undefined /* alebo tvoj stav */}
      />
    </>
  )
}
