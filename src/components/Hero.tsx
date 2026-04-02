import styled, { keyframes } from 'styled-components'
import type { Hero as HeroType } from '../types'

interface Props { hero: HeroType; descricao: string }

export default function Hero({ hero, descricao }: Props) {
  return (
    <Section id="hero">
      <BlobGold />
      <BlobRed />
      <Inner>
        <Pill>{hero.pill}</Pill>
        <Title>
          {hero.titulo_linha1}
          <br />
          <TitleAccent>{hero.titulo_linha2}</TitleAccent>
        </Title>
        <Desc>{descricao}</Desc>
        <StatsBar>
          {hero.stats.map((s, i) => (
            <StatItem key={i}>
              <StatVal>{s.valor}</StatVal>
              <StatLabel>{s.label}</StatLabel>
            </StatItem>
          ))}
        </StatsBar>
        <Actions>
          <BtnGold href="#inscricao">Garantir minha vaga</BtnGold>
          <BtnOutline href="#lutas">Ver lutas</BtnOutline>
        </Actions>
      </Inner>
    </Section>
  )
}

const drift = keyframes`
  from { transform: translate(0, 0); }
  to   { transform: translate(30px, 20px); }
`
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`

const Section = styled.section`
  min-height: 100vh;
  display: grid; place-items: center;
  padding: 8rem 2rem 5rem;
  position: relative; overflow: hidden;
  &::before {
    content: ''; position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    pointer-events: none;
  }
`
const BlobBase = styled.div`
  position: absolute; border-radius: 50%;
  filter: blur(90px); pointer-events: none;
`
const BlobGold = styled(BlobBase)`
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(232,160,32,0.18) 0%, transparent 70%);
  top: -100px; left: -100px;
  animation: ${drift} 12s ease-in-out infinite alternate;
`
const BlobRed = styled(BlobBase)`
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(212,43,43,0.14) 0%, transparent 70%);
  bottom: 0; right: -80px;
  animation: ${drift} 9s ease-in-out infinite alternate-reverse;
`
const Inner = styled.div`
  position: relative; z-index: 2;
  text-align: center; max-width: 820px; width: 100%;
`
const Pill = styled.div`
  display: inline-flex; align-items: center; gap: 0.5rem;
  border: 1px solid rgba(232,160,32,0.3); background: rgba(232,160,32,0.06);
  border-radius: 100px; padding: 0.35rem 1rem;
  font-size: 0.75rem; font-weight: 500; letter-spacing: 0.08em;
  color: ${({ theme }) => theme.gold}; text-transform: uppercase;
  margin-bottom: 2rem;
  animation: ${fadeUp} 0.6s ease both;
  &::before {
    content: ''; width: 6px; height: 6px;
    background: ${({ theme }) => theme.gold}; border-radius: 50%;
  }
`
const Title = styled.h1`
  font-family: ${({ theme }) => theme.fontDisplay};
  font-weight: 800; font-size: clamp(3rem, 9vw, 6.5rem);
  line-height: 1; letter-spacing: -0.02em;
  animation: ${fadeUp} 0.6s 0.1s ease both;
`
const TitleAccent = styled.span`color: ${({ theme }) => theme.gold};`
const Desc = styled.p`
  margin: 1.5rem auto 0; font-size: 1.05rem;
  color: ${({ theme }) => theme.muted}; line-height: 1.65; max-width: 520px;
  animation: ${fadeUp} 0.6s 0.2s ease both;
`
const StatsBar = styled.div`
  display: flex; justify-content: center; margin-top: 3rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px; overflow: hidden; background: ${({ theme }) => theme.surface};
  animation: ${fadeUp} 0.6s 0.3s ease both;
  @media (max-width: 640px) { flex-direction: column; }
`
const StatItem = styled.div`
  flex: 1; padding: 1.4rem 1rem; text-align: center;
  border-right: 1px solid ${({ theme }) => theme.border};
  &:last-child { border-right: none; }
  @media (max-width: 640px) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    &:last-child { border-bottom: none; }
  }
`
const StatVal = styled.div`
  font-family: ${({ theme }) => theme.fontDisplay};
  font-weight: 700; font-size: 1.6rem; color: ${({ theme }) => theme.gold};
`
const StatLabel = styled.div`
  font-size: 0.72rem; color: ${({ theme }) => theme.muted}; margin-top: 0.2rem;
`
const Actions = styled.div`
  display: flex; gap: 1rem; justify-content: center; margin-top: 2.5rem;
  animation: ${fadeUp} 0.6s 0.4s ease both;
  @media (max-width: 480px) { flex-direction: column; align-items: center; }
`
const BtnBase = styled.a`
  display: inline-block;
  font-family: ${({ theme }) => theme.fontDisplay};
  font-weight: 600; font-size: 0.9rem; letter-spacing: 0.04em;
  padding: 0.85rem 2rem; border-radius: 6px; transition: all 0.2s;
`
const BtnGold = styled(BtnBase)`
  background: ${({ theme }) => theme.gold}; color: #000;
  &:hover { opacity: 0.88; transform: translateY(-1px); }
`
const BtnOutline = styled(BtnBase)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  &:hover { border-color: rgba(255,255,255,0.25); background: ${({ theme }) => theme.surface}; }
`
