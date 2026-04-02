# Super Nordeste K2 — Site do Campeonato

Site de página única para o campeonato de arm wrestling **Super Nordeste K2**, construído com **Vite + React + TypeScript + Styled Components**.

---

## 🚀 Como rodar

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev

# 3. Para gerar o build de produção
npm run build
```

Após o build, a pasta `dist/` contém os arquivos estáticos prontos para hospedar em qualquer servidor ou serviço como **Netlify**, **Vercel** ou **GitHub Pages**.

---

## ✏️ Como editar o conteúdo

**Todo o conteúdo do site está em um único arquivo:**

```
src/data/data.json
```

Você nunca precisa mexer nos arquivos `.tsx`. Basta editar o JSON:

| Campo | O que faz |
|---|---|
| `site.whatsapp` | Número do WhatsApp do organizador (formato: `5583999999999`) |
| `site.titulo` | Nome do campeonato |
| `site.instagram` | @ do Instagram |
| `site.descricao` | Texto do hero |
| `evento.*` | Data, cidade, bairro, endereço, etc. |
| `hero.pill` | Texto da pílula no topo do hero |
| `hero.stats` | Os 4 números destacados (categorias, cinturões, valor, data) |
| `lutas` | Lista de confrontos — adicione ou remova objetos |
| `categorias` | Pesos disponíveis — `tipo` pode ser `"open"` ou `"iniciante"` |
| `inscricao.mensagem_whatsapp` | Texto enviado ao WhatsApp com os dados do atleta |
| `inscricao.perks` | Benefícios listados na seção de inscrição |

### Exemplo: adicionar uma luta

```json
{
  "destaque": false,
  "lutador1": { "nome": "Carlos", "estado": "CE", "tag": "Representante CE" },
  "lutador2": { "nome": "Rafael", "estado": "RN", "tag": "Representante RN" },
  "cinturao": true
}
```

### Exemplo: adicionar uma categoria

```json
{ "peso": "75", "unidade": "kg", "tipo": "open" }
```

---

## 📁 Estrutura do projeto

```
supernordeste-k2/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx          # Ponto de entrada
    ├── App.tsx           # Raiz da aplicação
    ├── vite-env.d.ts
    ├── data/
    │   └── data.json     # ← EDITE AQUI
    ├── types/
    │   └── index.ts      # Tipagens TypeScript
    ├── hooks/
    │   └── useReveal.ts  # Hook de animação scroll
    ├── styles/
    │   ├── theme.ts      # Cores e fontes
    │   └── GlobalStyle.ts
    └── components/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── Lutas.tsx
        ├── Categorias.tsx
        ├── Evento.tsx
        ├── Inscricao.tsx
        └── Footer.tsx
```
