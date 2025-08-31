import { supabase } from '@/lib/supabase'
import { 
  Usuario, 
  UsuarioCreateData, 
  UsuarioUpdateData, 
  UsuarioWithRelations,
  UsuarioComunidade,
  UsuarioComunidadeCreateData,
  PaginatedResponse 
} from '@/types/database'

export class UsuarioService {
  private static readonly TABLE_NAME = 'usuario'
  private static readonly USER_COMMUNITY_TABLE = 'usuario_comunidade'

  // Get all users with pagination
  static async getUsuarios(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Usuario>> {
    const offset = (page - 1) * limit

    const { data, error, count } = await supabase
      .from(this.TABLE_NAME)
      .select('*', { count: 'exact' })
      .order('nome_usuario', { ascending: true })
      .range(offset, offset + limit - 1)

    if (error) {
      throw new Error(`Error fetching users: ${error.message}`)
    }

    return {
      data: data || [],
      count: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
    }
  }

  // Get user by ID
  static async getUsuarioById(id: number): Promise<Usuario | null> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('id_usuario', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw new Error(`Error fetching user: ${error.message}`)
    }

    return data
  }

  // Get user with relationships
  static async getUsuarioWithRelations(id: number): Promise<UsuarioWithRelations | null> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select(`
        *,
        comunidades:usuario_comunidade(
          *,
          comunidade:comunidade(*)
        ),
        membros:membro(*)
      `)
      .eq('id_usuario', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw new Error(`Error fetching user with relations: ${error.message}`)
    }

    return data
  }

  // Get user by email
  static async getUsuarioByEmail(email: string): Promise<Usuario | null> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw new Error(`Error fetching user by email: ${error.message}`)
    }

    return data
  }

  // Create new user
  static async createUsuario(usuarioData: UsuarioCreateData): Promise<Usuario> {
    // Validate required fields
    if (!usuarioData.nome_usuario?.trim()) {
      throw new Error('Nome do usuário é obrigatório')
    }
    if (!usuarioData.email?.trim()) {
      throw new Error('Email é obrigatório')
    }
    if (!usuarioData.senha_hash?.trim()) {
      throw new Error('Senha é obrigatória')
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(usuarioData.email.trim())) {
      throw new Error('Formato de email inválido')
    }

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .insert({
        nome_usuario: usuarioData.nome_usuario.trim(),
        email: usuarioData.email.toLowerCase().trim(),
        senha_hash: usuarioData.senha_hash
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        throw new Error('Email já está em uso')
      }
      throw new Error(`Error creating user: ${error.message}`)
    }

    return data
  }

  // Update user
  static async updateUsuario(id: number, usuarioData: UsuarioUpdateData): Promise<Usuario> {
    // Validate fields if provided
    if (usuarioData.nome_usuario !== undefined && !usuarioData.nome_usuario.trim()) {
      throw new Error('Nome do usuário não pode estar vazio')
    }
    if (usuarioData.email !== undefined) {
      if (!usuarioData.email.trim()) {
        throw new Error('Email não pode estar vazio')
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(usuarioData.email.trim())) {
        throw new Error('Formato de email inválido')
      }
    }

    const updateData: Partial<Usuario> = {}
    if (usuarioData.nome_usuario !== undefined) updateData.nome_usuario = usuarioData.nome_usuario.trim()
    if (usuarioData.email !== undefined) updateData.email = usuarioData.email.toLowerCase().trim()
    if (usuarioData.senha_hash !== undefined) updateData.senha_hash = usuarioData.senha_hash

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .update(updateData)
      .eq('id_usuario', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Usuário não encontrado')
      }
      if (error.code === '23505') {
        throw new Error('Email já está em uso')
      }
      throw new Error(`Error updating user: ${error.message}`)
    }

    return data
  }

  // Delete user
  static async deleteUsuario(id: number): Promise<void> {
    const { error } = await supabase
      .from(this.TABLE_NAME)
      .delete()
      .eq('id_usuario', id)

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Usuário não encontrado')
      }
      if (error.code === '23503') {
        throw new Error('Não é possível deletar usuário que possui registros relacionados')
      }
      throw new Error(`Error deleting user: ${error.message}`)
    }
  }

  // Search users by name or email
  static async searchUsuarios(searchTerm: string): Promise<Usuario[]> {
    if (!searchTerm.trim()) {
      return []
    }

    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .or(`nome_usuario.ilike.%${searchTerm.trim()}%,email.ilike.%${searchTerm.trim()}%`)
      .order('nome_usuario', { ascending: true })
      .limit(20)

    if (error) {
      throw new Error(`Error searching users: ${error.message}`)
    }

    return data || []
  }

  // Add user to community
  static async addUsuarioToComunidade(usuarioComunidadeData: UsuarioComunidadeCreateData): Promise<UsuarioComunidade> {
    const { data, error } = await supabase
      .from(this.USER_COMMUNITY_TABLE)
      .insert({
        id_usuario: usuarioComunidadeData.id_usuario,
        id_comunidade: usuarioComunidadeData.id_comunidade,
        data_adesao: usuarioComunidadeData.data_adesao,
        papel_na_comunidade: usuarioComunidadeData.papel_na_comunidade
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        throw new Error('Usuário já pertence a esta comunidade')
      }
      if (error.code === '23503') {
        throw new Error('Usuário ou comunidade não encontrados')
      }
      throw new Error(`Error adding user to community: ${error.message}`)
    }

    return data
  }

  // Remove user from community
  static async removeUsuarioFromComunidade(idUsuario: number, idComunidade: number): Promise<void> {
    const { error } = await supabase
      .from(this.USER_COMMUNITY_TABLE)
      .delete()
      .eq('id_usuario', idUsuario)
      .eq('id_comunidade', idComunidade)

    if (error) {
      throw new Error(`Error removing user from community: ${error.message}`)
    }
  }

  // Get user communities
  static async getUsuarioComunidades(idUsuario: number): Promise<UsuarioComunidade[]> {
    const { data, error } = await supabase
      .from(this.USER_COMMUNITY_TABLE)
      .select(`
        *,
        comunidade:comunidade(*)
      `)
      .eq('id_usuario', idUsuario)
      .order('data_adesao', { ascending: false })

    if (error) {
      throw new Error(`Error fetching user communities: ${error.message}`)
    }

    return data || []
  }

  // Check if email exists
  static async checkEmailExists(email: string, excludeId?: number): Promise<boolean> {
    let query = supabase
      .from(this.TABLE_NAME)
      .select('id_usuario')
      .eq('email', email.toLowerCase().trim())

    if (excludeId) {
      query = query.neq('id_usuario', excludeId)
    }

    const { data, error } = await query.single()

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Error checking email existence: ${error.message}`)
    }

    return !!data
  }
}
