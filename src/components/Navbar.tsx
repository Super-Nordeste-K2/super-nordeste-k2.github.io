import styled from 'styled-components'
import type { Site } from '../types'

export default function Navbar({ site }: { site: Site }) {
  const words = site.titulo.split(' ')
  const last = words[words.length - 1]
  const rest = words.slice(0, -1).join(' ')
  return (
    <Nav>
      <Brand href="#">{rest} <Accent>{last}</Accent></Brand>
      <Links>
        <li><a href="#lutas">Lutas</a></li>
        <li><a href="#categorias">Categorias</a></li>
        <li><a href="#evento">Evento</a></li>
        <li><a href="#inscricao" className="cta">Inscreva-se</a></li>
      </Links>
    </Nav>
  )
}

const Nav = styled.nav`
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.1rem 3rem;
  background: rgba(12,12,14,0.85);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid ${({ theme }) => theme.border};
  @media (max-width: 760px) { padding: 1rem 1.2rem; }
`
const Brand = styled.a`
  font-family: ${({ theme }) => theme.fontDisplay};
  font-weight: 800; font-size: 1rem; letter-spacing: 0.08em;
  color: ${({ theme }) => theme.text};
`
const Accent = styled.span`color: ${({ theme }) => theme.gold};`
const Links = styled.ul`
  display: flex; gap: 2rem; list-style: none;
  @media (max-width: 760px) { display: none; }
  a {
    font-size: 0.82rem; font-weight: 500; letter-spacing: 0.04em;
    color: ${({ theme }) => theme.muted}; transition: color 0.2s;
    &:hover { color: ${({ theme }) => theme.text}; }
    &.cta {
      background: ${({ theme }) => theme.gold}; color: #000;
      padding: 0.5rem 1.3rem; border-radius: 4px; font-weight: 600;
    }
  }
`
