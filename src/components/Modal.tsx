import React from 'react'
import { Icon } from './Icon'
import useOutsideClick from '../hooks/useOnClickOutside'
import styled from 'styled-components'

interface Props extends React.PropsWithChildren {
  onClose?: () => void
}

const StyledModal = styled.div`
  @keyframes appear {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  position: fixed;
  inset: 0;
  background: rgba(21, 21, 31, 0.95);
  z-index: 100;
  overflow-y: auto;
  height: 100vh;
  animation: appear 0.3s;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) {
    padding: 0;
  }
`

const Wrapper = styled.div`
  @keyframes wrapper-appear2 {
    0% { transform: scale(0.9); }
    100% { transform: scale(1); }
  }

  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 101;
  max-width: min(100%, 460px);
  width: 100%;
  background: #15151f;
  border-radius: 10px;
  padding-bottom: 20px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.6);
  animation: wrapper-appear2 0.3s;
  color: white;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  opacity: 0.75;
  transition: opacity 0.2s, background 0.2s;
  cursor: pointer;
  z-index: 11;

  &:hover {
    opacity: 1;
    background: #ffffff22;
  }

  & svg {
    color: white;
    vertical-align: middle;
  }
`

export function Modal({ children, onClose }: Props) {
  React.useEffect(() => {
    const oldValue = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = oldValue
    }
  }, [])

  const ref = React.useRef<HTMLDivElement>(null!)
  useOutsideClick(ref, () => onClose && onClose())

  return (
    <StyledModal>
      <Container>
        <Wrapper ref={ref}>
          {onClose && (
            <CloseButton onClick={onClose}>
              <Icon.Close2 />
            </CloseButton>
          )}
          {children}
        </Wrapper>
      </Container>
    </StyledModal>
  )
}
