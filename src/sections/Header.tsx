import { GambaUi, TokenValue, useCurrentPool, useGambaPlatformContext, useUserBalance } from 'gamba-react-ui-v2'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Modal } from '../components/Modal'
import { PLATFORM_JACKPOT_FEE } from '../constants'
import TokenSelect from './TokenSelect'
import { Icon } from '../components/Icon'

const Bonus = styled.button`
  all: unset;
  cursor: pointer;
  color: #003c00;
  border-radius: 10px;
  background: #03ffa4;
  padding: 2px 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color .2s;
  &:hover {
    background: white;
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background: rgba(33, 34, 51, 0.9);
  position: fixed;
  background: #000000CC;
  backdrop-filter: blur(20px);
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
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

const ConnectModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null

  return (
    <Modal onClose={onClose}>
      <h1>Connect</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
        <button onClick={() => onSelect('twitter')} style={{ padding: 12, background: '#1DA1F2', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold' }}>Connect with Twitter</button>
        <button onClick={() => onSelect('wallet')} style={{ padding: 12, background: '#03ffa4', color: '#003c00', border: 'none', borderRadius: 8, fontWeight: 'bold' }}>Connect Wallet</button>
      </div>
    </Modal>
  )
}

export default function Header() {
  const pool = useCurrentPool()
  const context = useGambaPlatformContext()
  const balance = useUserBalance()
  const [bonusHelp, setBonusHelp] = React.useState(false)
  const [jackpotHelp, setJackpotHelp] = React.useState(false)
  const [connectOpen, setConnectOpen] = React.useState(false)

  const handleConnectSelect = (method) => {
    setConnectOpen(false)
    if (method === 'twitter') {
      console.log('Twitter login')
    } else {
      console.log('Wallet connect')
    }
  }

  return (
    <>
      {bonusHelp && (
        <Modal onClose={() => setBonusHelp(false)}>
          <h1>Bonus ✨</h1>
          <p>
            You have <b><TokenValue amount={balance.bonusBalance} /></b> worth of free plays. This bonus will be applied automatically when you play.
          </p>
          <p>
            Note that a fee is still needed from your wallet for each play.
          </p>
        </Modal>
      )}
      {jackpotHelp && (
        <Modal onClose={() => setJackpotHelp(false)}>
          <h1>Jackpot 💰</h1>
          <p style={{ fontWeight: 'bold' }}>
            There{'\''}s <TokenValue amount={pool.jackpotBalance} /> in the Jackpot.
          </p>
          <p>
            The Jackpot is a prize pool that grows with every bet made. As the Jackpot grows, so does your chance of winning. Once a winner is selected, the value of the Jackpot resets and grows from there until a new winner is selected.
          </p>
          <p>
            You will be paying a maximum of {(PLATFORM_JACKPOT_FEE * 100).toLocaleString(undefined, { maximumFractionDigits: 4 })}% for each wager for a chance to win.
          </p>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {context.defaultJackpotFee === 0 ? 'DISABLED' : 'ENABLED'}
            <GambaUi.Switch
              checked={context.defaultJackpotFee > 0}
              onChange={(checked) => context.setDefaultJackpotFee(checked ? PLATFORM_JACKPOT_FEE : 0)}
            />
          </label>
        </Modal>
      )}
      <StyledHeader>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Logo to="/">
            <img alt="NexusPlay logo" src="/logo_casino.png" />
          </Logo>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', position: 'relative' }}>
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
          <button onClick={() => setConnectOpen(true)} style={{ padding: '6px 16px', borderRadius: 8, background: '#03ffa4', color: '#003c00', fontWeight: 'bold' }}>
            Connect
          </button>
        </div>
      </StyledHeader>
      <ConnectModal isOpen={connectOpen} onClose={() => setConnectOpen(false)} onSelect={handleConnectSelect} />
    </>
  )
}
