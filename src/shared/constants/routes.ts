export const ROUTES = {
  HOME: '/',
  CONTACT: '/contact',
  MY_CHURCH: '/discipulados',
} as const

export const NAV_ITEMS = [
  { path: ROUTES.HOME, label: 'Home' },
  { path: ROUTES.CONTACT, label: 'Contact' },
  { path: ROUTES.MY_CHURCH, label: 'Discipulados' }
] as const
