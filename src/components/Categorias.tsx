import styled from 'styled-components'
import type { Categoria } from '../types'
import { useReveal } from '../hooks/useReveal'

export default function Categorias({ categorias }: { categorias: Categoria[] }) {
  const { ref, visible } = useReveal()
  return (
    <Section id="categorias">
      <Container>
        <Header ref={ref} $visible={visible}>
          <Label>Compete na sua divisão</Label>
          <Heading>Categorias de Peso</Heading>
          <Sub>Modalidades abertas para todos os níveis — de iniciantes a veteranos.</Sub>
        </Header>
        <Grid>
          {categorias.map((c, i) => (
            <CatCard key={i} cat={c} index={i} />
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

function CatCard({ cat, index }: { cat: Categoria; index: number }) {
  const { ref, visible } = useReveal(index * 60)
  const isInit = cat.tipo === 'iniciante'
  return (
    <Card ref={ref} $visible={visible} $init={isInit}>
      <Weight $init={isInit}>{cat.peso}</Weight>
      <Unit>{cat.unidade}</Unit>
      <Badge $init={isInit}>{isInit ? 'Iniciante' : 'Open'}</Badge>
    </Card>
  )
}

const Section = styled.section`padding: 6rem 2rem; background: ${({ theme }) => theme.bg};`
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
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem;
`
const Card = styled.div<{ $visible: boolean; $init: boolean }>`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px; padding: 2rem 1rem; text-align: center;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(22px)')};
  transition: border-color 0.25s, transform 0.25s, opacity 0.65s ease;
  &:hover {
    border-color: ${({ $init }) => ($init ? 'rgba(212,43,43,0.4)' : 'rgba(232,160,32,0.35)')};
    transform: translateY(-3px);
  }
`
const Weight = styled.div<{ $init: boolean }>`
  font-family: ${({ theme }) => theme.fontDisplay};
  font-weight: 800; font-size: 2.2rem; line-height: 1;
  color: ${({ theme, $init }) => ($init ? '#ff5555' : theme.gold)};
`
const Unit = styled.div`font-size: 0.8rem; color: ${({ theme }) => theme.muted}; margin-top: 0.2rem;`
const Badge = styled.span<{ $init: boolean }>`
  display: inline-block; margin-top: 0.9rem;
  font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; padding: 0.22rem 0.7rem; border-radius: 100px;
  background: ${({ theme, $init }) => ($init ? theme.redDim : theme.goldDim)};
  color: ${({ theme, $init }) => ($init ? '#ff5555' : theme.gold)};
`
