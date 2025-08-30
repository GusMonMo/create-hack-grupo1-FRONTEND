import { useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '@/shared/constants/routes'

export const useNavigation = () => {
  const location = useLocation()

  const isActiveRoute = (path: string) => {
    return location.pathname === path
  }

  return {
    navItems: NAV_ITEMS,
    currentPath: location.pathname,
    isActiveRoute
  }
}
