import React from 'react'
import { Icon } from './Icon'
import useOutsideClick from '../hooks/useOnClickOutside'
import styled from 'styled-components'

interface Props extends React.PropsWithChildren {
  onClose?: () => void
}

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: appear 0.3s ease;

  @keyframes appear {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #15151f;
  border-radius: 16px;
  max-width: 400px;
  width: 100%;
  padding: 30px 20px;
  box-shadow: 0 0 30px rgba(0,0,0,0.6);
  z-index: 110;
  animation: wrapper-appear 0.3s ease;

  @keyframes wrapper-appear {
    0% { transform: scale(0.95); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
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
            <button className="close" onClick={onClose}>
              <Icon.Close2 />
            </button>
          )}
          {children}
        </Wrapper>
      </Container>
    </StyledModal>
  )
}
