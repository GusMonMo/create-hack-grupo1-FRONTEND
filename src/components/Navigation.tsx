import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/contact', label: 'Contact' },
    { path: '/my-church', label: 'My Church' }
  ]

  return (
    <nav className="flex justify-center items-center gap-[4vmax] px-4 py-[2vmax]">
      <div className="flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-white">
            ChurchApp
          </Link>
        </div>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? ' text-white hover'
                  : 'text-white text-opacity-90 hover'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
