import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { GambaUi } from 'gamba-react-ui-v2'
import { useTransactionError } from 'gamba-react-v2'
import { Modal } from './components/Modal'
import { TOS_HTML } from './constants'
import { useToast } from './hooks/useToast'
import { useUserStore } from './hooks/useUserStore'
import Header from './sections/Header'
import Dashboard from './sections/Dashboard/Dashboard'
import Game from './sections/Game/Game'
import RecentPlays from './sections/RecentPlays/RecentPlays'
import Toasts from './sections/Toasts'
import { MainWrapper, TosInner, TosWrapper } from './styles'

function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => window.scrollTo(0,0), [pathname])
  return null
}

function ErrorHandler() {
  const walletModal = useWalletModal()
  const toast = useToast()
  React.useEffect(() => {
    return useTransactionError((err) => {
      if (err.message === 'NOT_CONNECTED') {
        walletModal.setVisible(true)
      } else {
        toast({ title:'❌ Transaction error', description:err.error?.errorMessage ?? err.message })
      }
    })
  }, [])
  return null
}

export default function App() {
  const newcomer = useUserStore(s => s.newcomer)
  const set = useUserStore(s => s.set)

  return (
    <>
      {newcomer && (
        <Modal>
          <h1>Welcome</h1>
          <TosWrapper><TosInner dangerouslySetInnerHTML={{ __html:TOS_HTML }} /></TosWrapper>
          <p>Play responsibly.</p>
          <GambaUi.Button main onClick={() => set({ newcomer:false })}>Acknowledge</GambaUi.Button>
        </Modal>
      )}
      <ScrollToTop />
      <ErrorHandler />
      <Header />
      <Toasts />
      <MainWrapper>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/:gameId' element={<Game />} />
        </Routes>
        <h2 style={{ textAlign:'center' }}>Recent Plays</h2>
        <RecentPlays />
      </MainWrapper>
    </>
  )
}
