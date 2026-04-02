export interface Stat {
  valor: string
  label: string
}

export interface Hero {
  pill: string
  titulo_linha1: string
  titulo_linha2: string
  stats: Stat[]
}

export interface Fighter {
  nome: string
  estado: string
  tag: string
}

export interface Luta {
  destaque: boolean
  lutador1: Fighter
  lutador2: Fighter
  cinturao: boolean
}

export interface Categoria {
  peso: string
  unidade: string
  tipo: 'open' | 'iniciante'
}

export interface Evento {
  data: string
  cidade: string
  bairro: string
  logradouro: string
  destaque: string
  organizacao: string
}

export interface Inscricao {
  valor: string
  nota: string
  perks: string[]
  mensagem_whatsapp: string
}

export interface Site {
  titulo: string
  descricao: string
  instagram: string
  whatsapp: string
}

export interface SiteData {
  site: Site
  evento: Evento
  hero: Hero
  lutas: Luta[]
  categorias: Categoria[]
  inscricao: Inscricao
}
