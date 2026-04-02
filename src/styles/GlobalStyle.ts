import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.fontBody};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  a { text-decoration: none; }
  button { cursor: pointer; border: none; }
  select { appearance: none; }
`

export default GlobalStyle
