import styled from 'styled-components'
import type { Luta } from '../types'
import { useReveal } from '../hooks/useReveal'

export default function Lutas({ lutas }: { lutas: Luta[] }) {
  const { ref, visible } = useReveal()
  return (
    <Section id="lutas">
      <Container>
        <Header ref={ref} $visible={visible}>
          <Label>Card do evento</Label>
          <Heading>Lutas Principais</Heading>
          <Sub>Confrontos confirmados para o evento, com cinturões em disputa.</Sub>
        </Header>
        <Grid>
          {lutas.map((l, i) => <FightCard key={i} luta={l} index={i} />)}
        </Grid>
      </Container>
    </Section>
  )
}

function FightCard({ luta, index }: { luta: Luta; index: number }) {
  const { ref, visible } = useReveal(index * 80)
  return (
    <Card ref={ref} $visible={visible} $main={luta.destaque}>
      <Fighter>
        <FighterName>{luta.lutador1.nome}</FighterName>
        <FighterState>{luta.lutador1.estado}</FighterState>
        {luta.lutador1.tag && <Tag $color="gold">{luta.lutador1.tag}</Tag>}
      </Fighter>
      <VS>
        <VSText>VS</VSText>
        {luta.cinturao && <Belt>🏆 Cinturão</Belt>}
      </VS>
      <Fighter $right>
        <FighterName>{luta.lutador2.nome}</FighterName>
        <FighterState>{luta.lutador2.estado}</FighterState>
        {luta.lutador2.tag && <Tag $color="red">{luta.lutador2.tag}</Tag>}
      </Fighter>
    </Card>
  )
}

const Section = styled.section`padding: 6rem 2rem; background: ${({ theme }) => theme.bg2};`
const Container = styled.div`max-width: 1080px; margin: 0 auto;`

const Header = styled.div<{ $visible: boolean }>`
  margin-bottom: 3.5rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(22px)')};
  transition: opacity 0.65s ease, transform 0.65s ease;
`
const Label = styled.p`
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em;
  text-transform: uppercase; color: ${({ theme }) => theme.gold}; margin-bottom: 0.6rem;
`
const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fontDisplay};
  font-weight: 800; font-size: clamp(1.8rem, 4vw, 2.8rem);
  line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 1rem;
`
const Sub = styled.p`font-size: 0.95rem; color: ${({ theme }) => theme.muted}; line-height: 1.65; max-width: 480px;`
const Grid = styled.div`display: flex; flex-direction: column; gap: 1rem;`

const Card = styled.div<{ $visible: boolean; $main: boolean }>`
  background: ${({ theme, $main }) =>
    $main
      ? `linear-gradient(135deg, rgba(232,160,32,0.04) 0%, ${theme.surface} 60%)`
      : theme.surface};
  border: 1px solid ${({ theme, $main }) => ($main ? 'rgba(232,160,32,0.25)' : theme.border)};
  border-radius: 12px; padding: 1.8rem 2rem;
  display: grid; grid-template-columns: 1fr auto 1fr;
  align-items: center; gap: 1.5rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(22px)')};
  transition: border-color 0.25s, transform 0.25s, opacity 0.65s ease;
  &:hover { border-color: rgba(232,160,32,0.3); transform: translateY(-2px); }
  @media (max-width: 640px) { grid-template-columns: 1fr; text-align: center; gap: 0.8rem; }
`
const Fighter = styled.div<{ $right?: boolean }>`
  display: flex; flex-direction: column; gap: 0.2rem;
  text-align: ${({ $right }) => ($right ? 'right' : 'left')};
  @media (max-width: 640px) { text-align: center; }
`
const FighterName = styled.span`
  font-family: ${({ theme }) => theme.fontDisplay}; font-weight: 700; font-size: 1.2rem;
`
const FighterState = styled.span`
  font-size: 0.75rem; color: ${({ theme }) => theme.muted};
  letter-spacing: 0.06em; text-transform: uppercase;
`
const Tag = styled.span<{ $color: 'gold' | 'red' }>`
  display: inline-block; margin-top: 0.3rem;
  font-size: 0.68rem; padding: 0.2rem 0.6rem; border-radius: 4px; font-weight: 500;
  background: ${({ theme, $color }) => ($color === 'gold' ? theme.goldDim : theme.redDim)};
  color: ${({ theme, $color }) => ($color === 'gold' ? theme.gold : '#ff5555')};
`
const VS = styled.div`display: flex; flex-direction: column; align-items: center; gap: 0.4rem;`
const VSText = styled.span`
  font-family: ${({ theme }) => theme.fontDisplay};
  font-weight: 800; font-size: 1.1rem; color: ${({ theme }) => theme.red};
`
const Belt = styled.span`
  font-size: 0.62rem; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; color: ${({ theme }) => theme.gold};
  background: ${({ theme }) => theme.goldDim};
  padding: 0.2rem 0.55rem; border-radius: 4px; white-space: nowrap;
`
