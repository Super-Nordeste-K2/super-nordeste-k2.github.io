import styled from 'styled-components'
import type { Site } from '../types'

export default function Footer({ site }: { site: Site }) {
  const words = site.titulo.split(' ')
  const last = words[words.length - 1]
  const rest = words.slice(0, -1).join(' ')
  const igHandle = site.instagram.replace('@', '')
  return (
    <Wrap>
      <Inner>
        <Brand>{rest} <Accent>{last}</Accent></Brand>
        <Right>
          Instagram:{' '}
          <a href={`https://instagram.com/${igHandle}`} target="_blank" rel="noreferrer">
            {site.instagram}
          </a>
        </Right>
      </Inner>
    </Wrap>
  )
}

const Wrap = styled.div`border-top: 1px solid ${({ theme }) => theme.border}; padding: 0 2rem;`
const Inner = styled.footer`
  max-width: 1080px; margin: 0 auto; padding: 2.5rem 0;
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;
`
const Brand = styled.div`font-family: ${({ theme }) => theme.fontDisplay}; font-weight: 700; font-size: 0.95rem;`
const Accent = styled.span`color: ${({ theme }) => theme.gold};`
const Right = styled.div`
  font-size: 0.8rem; color: ${({ theme }) => theme.muted};
  a { color: ${({ theme }) => theme.gold}; }
`
