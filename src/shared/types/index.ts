// Navigation types
export interface NavItem {
  path: string
  label: string
  icon?: string
}

// Common UI types
export interface BaseComponent {
  className?: string
  children?: React.ReactNode
}

// API Response types
export interface ApiResponse<T = any> {
  data: T
  message: string
  success: boolean
}
