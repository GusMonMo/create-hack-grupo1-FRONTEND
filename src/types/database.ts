// Base interfaces for all entities
export interface BaseEntity {
  created_at?: string
  updated_at?: string
}

// Igreja (Church) entity
export interface Igreja extends BaseEntity {
  id_igreja: number
  nome: string
  endereco: string
}

export interface IgrejaCreateData {
  nome: string
  endereco: string
}

export interface IgrejaUpdateData {
  nome?: string
  endereco?: string
}

// Usuario (User) entity
export interface Usuario extends BaseEntity {
  id_usuario: number
  nome_usuario: string
  email: string
  senha_hash: string
}

export interface UsuarioCreateData {
  nome_usuario: string
  email: string
  senha_hash: string
}

export interface UsuarioUpdateData {
  nome_usuario?: string
  email?: string
  senha_hash?: string
}

// Lista (List) entity
export interface Lista extends BaseEntity {
  id_lista: number
  nome_lista: string
  tipo_lista: string
}

export interface ListaCreateData {
  nome_lista: string
  tipo_lista: string
}

export interface ListaUpdateData {
  nome_lista?: string
  tipo_lista?: string
}

// Membro (Member) entity
export interface Membro extends BaseEntity {
  id_membro: number
  data_adesao: string
  status_membro: string
}

export interface MembroCreateData {
  data_adesao: string
  status_membro: string
}

export interface MembroUpdateData {
  data_adesao?: string
  status_membro?: string
}

// Lista_Membro (List Member) junction entity
export interface ListaMembro extends BaseEntity {
  id_lista: number
  id_membro: number
  data_inclusao: string
}

export interface ListaMembroCreateData {
  id_lista: number
  id_membro: number
  data_inclusao: string
}

// Comunidade (Community) entity
export interface Comunidade extends BaseEntity {
  id_comunidade: number
  nome_comunidade: string
  descricao: string
}

export interface ComunidadeCreateData {
  nome_comunidade: string
  descricao: string
}

export interface ComunidadeUpdateData {
  nome_comunidade?: string
  descricao?: string
}

// Usuario_Comunidade (User Community) junction entity
export interface UsuarioComunidade extends BaseEntity {
  id_usuario: number
  id_comunidade: number
  data_adesao: string
  papel_na_comunidade: string
}

export interface UsuarioComunidadeCreateData {
  id_usuario: number
  id_comunidade: number
  data_adesao: string
  papel_na_comunidade: string
}

export interface UsuarioComunidadeUpdateData {
  data_adesao?: string
  papel_na_comunidade?: string
}

// Extended interfaces with relationships
export interface UsuarioWithRelations extends Usuario {
  comunidades?: UsuarioComunidade[]
  membros?: Membro[]
}

export interface ListaWithMembers extends Lista {
  membros?: (ListaMembro & { membro: Membro })[]
}

export interface ComunidadeWithUsers extends Comunidade {
  usuarios?: (UsuarioComunidade & { usuario: Usuario })[]
}

// API Response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
  totalPages: number
}
