import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import GlobalStyle from './styles/GlobalStyle'
import type { SiteData } from './types'
import rawData from './data/data.json'

import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import Lutas      from './components/Lutas'
import Categorias from './components/Categorias'
import Evento     from './components/Evento'
import Inscricao  from './components/Inscricao'
import Footer     from './components/Footer'

const data = rawData as SiteData

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar     site={data.site} />
      <Hero       hero={data.hero} descricao={data.site.descricao} />
      <Lutas      lutas={data.lutas} />
      <Categorias categorias={data.categorias} />
      <Evento     evento={data.evento} />
      <Inscricao  inscricao={data.inscricao} categorias={data.categorias} site={data.site} />
      <Footer     site={data.site} />
    </ThemeProvider>
  )
}
