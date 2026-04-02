import { useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import type { Inscricao as InscricaoType, Categoria, Site } from '../types'
import { useReveal } from '../hooks/useReveal'

interface Props {
  inscricao: InscricaoType
  categorias: Categoria[]
  site: Site
}

interface FormState {
  nome: string
  whatsapp: string
  cidade: string
  peso: string
  categoria: string
  braco: string
}

const emptyForm: FormState = {
  nome: '', whatsapp: '', cidade: '', peso: '', categoria: '', braco: '',
}

export default function Inscricao({ inscricao, categorias, site }: Props) {
  const { ref: asideRef, visible: asideVis } = useReveal()
  const { ref: formRef,  visible: formVis  } = useReveal(120)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [error, setError] = useState('')

  const openCats  = categorias.filter(c => c.tipo === 'open')
  const initCats  = categorias.filter(c => c.tipo === 'iniciante')

  function set(key: keyof FormState) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }))
  }

  function handleSubmit() {
    if (Object.values(form).some(v => !String(v).trim())) {
      setError('Por favor, preencha todos os campos antes de enviar.')
      return
    }
    setError('')
    const msg = inscricao.mensagem_whatsapp
      .replace('{nome}',      form.nome)
      .replace('{whatsapp}',  form.whatsapp)
      .replace('{cidade}',    form.cidade)
      .replace('{peso}',      form.peso)
      .replace('{categoria}', form.categoria)
      .replace('{braco}',     form.braco)
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <Section id="inscricao">
      <Container>
        <Layout>
          {/* ── Aside ── */}
          <Aside ref={asideRef} $visible={asideVis}>
            <Label>Garanta sua vaga</Label>
            <Heading>Inscrição</Heading>
            <Sub>
              Preencha o formulário e você será redirecionado ao WhatsApp do organizador para confirmar.
            </Sub>
            <PriceBlock>
              <PriceLabel>Taxa de inscrição</PriceLabel>
              <PriceAmount>{inscricao.valor}</PriceAmount>
              <PriceNote>{inscricao.nota}</PriceNote>
              <Perks>
                {inscricao.perks.map((p, i) => (
                  <Perk key={i}><Dot />{p}</Perk>
                ))}
              </Perks>
            </PriceBlock>
          </Aside>

          {/* ── Form ── */}
          <FormCard ref={formRef} $visible={formVis}>
            <FormTitle>Dados do Atleta</FormTitle>

            <Field>
              <label>Nome completo</label>
              <input value={form.nome} onChange={set('nome')} placeholder="Seu nome" />
            </Field>

            <FieldRow>
              <Field>
                <label>WhatsApp</label>
                <input value={form.whatsapp} onChange={set('whatsapp')} placeholder="(83) 00000-0000" />
              </Field>
              <Field>
                <label>Cidade / Estado</label>
                <input value={form.cidade} onChange={set('cidade')} placeholder="João Pessoa / PB" />
              </Field>
            </FieldRow>

            <FieldRow>
              <Field>
                <label>Peso (kg)</label>
                <input type="number" value={form.peso} onChange={set('peso')} placeholder="Ex: 85" />
              </Field>
              <Field>
                <label>Categoria</label>
                <select value={form.categoria} onChange={set('categoria')}>
                  <option value="">Selecione</option>
                  {openCats.length > 0 && (
                    <optgroup label="Open">
                      {openCats.map((c, i) => (
                        <option key={i} value={`${c.peso} ${c.unidade} – Open`}>
                          {c.peso} {c.unidade} – Open
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {initCats.length > 0 && (
                    <optgroup label="Iniciante">
                      {initCats.map((c, i) => (
                        <option key={i} value={`${c.peso} ${c.unidade} – Iniciante`}>
                          {c.peso} {c.unidade} – Iniciante
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </Field>
            </FieldRow>

            <Field>
              <label>Braço</label>
              <select value={form.braco} onChange={set('braco')}>
                <option value="">Selecione</option>
                <option value="Direito">Direito</option>
                <option value="Esquerdo">Esquerdo</option>
                <option value="Ambos">Ambos</option>
              </select>
            </Field>

            {error && <ErrorMsg>{error}</ErrorMsg>}

            <SubmitBtn type="button" onClick={handleSubmit}>
              Confirmar Inscrição via WhatsApp
            </SubmitBtn>
          </FormCard>
        </Layout>
      </Container>
    </Section>
  )
}

const Section = styled.section`padding: 6rem 2rem; background: ${({ theme }) => theme.bg};`
const Container = styled.div`max-width: 1080px; margin: 0 auto;`
const Layout = styled.div`
  display: grid; grid-template-columns: 1fr 1.5fr; gap: 4rem; align-items: start;
  @media (max-width: 760px) { grid-template-columns: 1fr; gap: 2.5rem; }
`
const Aside = styled.div<{ $visible: boolean }>`
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
const Sub = styled.p`font-size: 0.95rem; color: ${({ theme }) => theme.muted}; line-height: 1.65;`
const PriceBlock = styled.div`
  margin-top: 2rem; background: ${({ theme }) => theme.surface};
  border: 1px solid rgba(232,160,32,0.2); border-radius: 12px; padding: 1.8rem;
`
const PriceLabel = styled.div`font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: ${({ theme }) => theme.muted};`
const PriceAmount = styled.div`
  font-family: ${({ theme }) => theme.fontDisplay};
  font-weight: 800; font-size: 3rem; color: ${({ theme }) => theme.gold};
  line-height: 1; margin-top: 0.4rem;
`
const PriceNote = styled.div`font-size: 0.82rem; color: ${({ theme }) => theme.muted}; margin-top: 0.6rem;`
const Perks = styled.div`margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.7rem;`
const Perk = styled.div`display: flex; gap: 0.7rem; font-size: 0.88rem; color: ${({ theme }) => theme.muted}; align-items: center;`
const Dot = styled.div`width: 6px; height: 6px; background: ${({ theme }) => theme.gold}; border-radius: 50%; flex-shrink: 0;`

const FormCard = styled.div<{ $visible: boolean }>`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px; padding: 2.5rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(22px)')};
  transition: opacity 0.65s ease, transform 0.65s ease;
  @media (max-width: 480px) { padding: 1.5rem; }
`
const FormTitle = styled.div`
  font-family: ${({ theme }) => theme.fontDisplay};
  font-weight: 700; font-size: 1.2rem; margin-bottom: 1.8rem;
`
const Field = styled.div`
  margin-bottom: 1.1rem;
  label {
    display: block; font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.04em; color: ${({ theme }) => theme.muted}; margin-bottom: 0.45rem;
  }
  input, select {
    width: 100%; background: rgba(255,255,255,0.04);
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 6px; color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.fontBody};
    font-size: 0.95rem; padding: 0.75rem 1rem; outline: none;
    transition: border-color 0.2s; appearance: none;
    &::placeholder { color: rgba(255,255,255,0.18); }
    &:focus { border-color: ${({ theme }) => theme.gold}; }
    option, optgroup { background: #17171B; }
  }
`
const FieldRow = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`
const ErrorMsg = styled.p`font-size: 0.82rem; color: #ff5555; margin-bottom: 0.8rem;`
const SubmitBtn = styled.button`
  width: 100%; margin-top: 0.8rem; padding: 1rem;
  font-family: ${({ theme }) => theme.fontDisplay};
  font-weight: 600; font-size: 0.95rem; letter-spacing: 0.04em;
  background: ${({ theme }) => theme.gold}; color: #000;
  border-radius: 6px; transition: opacity 0.2s, transform 0.2s;
  &:hover { opacity: 0.88; transform: translateY(-1px); }
`
