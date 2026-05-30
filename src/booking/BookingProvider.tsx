import type { ReactNode } from 'react'
import { ModalContext, useModalState } from '../hooks/useModal'
import { BookingModal } from './BookingModal'

/**
 * Provê o contexto de aberto/fechado que os CTAs já consomem via useModal()
 * (Button openModal, Navbar, cards de Programs…) e renderiza o BookingModal.
 * Editar o fluxo aqui reflete em todos os CTAs sem tocar em cada botão.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const modal = useModalState()
  return (
    <ModalContext.Provider value={modal}>
      {children}
      <BookingModal isOpen={modal.isOpen} onClose={modal.closeModal} />
    </ModalContext.Provider>
  )
}
