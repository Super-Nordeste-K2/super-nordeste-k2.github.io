import styled from 'styled-components'
import type { Evento as EventoType } from '../types'
import { useReveal } from '../hooks/useReveal'

export default function Evento({ evento }: { evento: EventoType }) {
  const { ref, visible } = useReveal()
  const items = [
    { icon: '📅', label: 'Data',         val: evento.data },
    { icon: '📍', label: 'Cidade',       val: evento.cidade },
    { icon: '🏘️', label: 'Bairro',       val: evento.bairro },
    { icon: '🛣️', label: 'Logradouro',   val: evento.logradouro },
    { icon: '🏆', label: 'Destaques',    val: evento.destaque },
    { icon: '🤼', label: 'Organização',  val: evento.organizacao },
  ]
  return (
    <Section id="evento">
      <Container>
        <Header ref={ref} $visible={visible}>
          <Label>Local & Data</Label>
          <Heading>Informações do Evento</Heading>
        </Header>
        <Grid>
          {items.map((item, i) => (
            <InfoCard key={i} item={item} index={i} />
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

function InfoCard({
  item,
  index,
}: {
  item: { icon: string; label: string; val: string }
  index: number
}) {
  const { ref, visible } = useReveal(index * 70)
  return (
    <Card ref={ref} $visible={visible}>
      <Icon>{item.icon}</Icon>
      <div>
        <InfoLabel>{item.label}</InfoLabel>
        <InfoVal>{item.val}</InfoVal>
      </div>
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
  line-height: 1.1; letter-spacing: -0.02em;
`
const Grid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`
const Card = styled.div<{ $visible: boolean }>`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px; padding: 1.5rem;
  display: flex; align-items: flex-start; gap: 1rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(22px)')};
  transition: opacity 0.65s ease, transform 0.65s ease;
`
const Icon = styled.div`
  width: 42px; height: 42px; background: ${({ theme }) => theme.goldDim};
  border-radius: 8px; display: grid; place-items: center;
  font-size: 1.2rem; flex-shrink: 0;
`
const InfoLabel = styled.div`
  font-size: 0.7rem; font-weight: 500; letter-spacing: 0.06em;
  text-transform: uppercase; color: ${({ theme }) => theme.muted}; margin-bottom: 0.3rem;
`
const InfoVal = styled.div`
  font-family: ${({ theme }) => theme.fontDisplay}; font-weight: 600; font-size: 1rem;
`
