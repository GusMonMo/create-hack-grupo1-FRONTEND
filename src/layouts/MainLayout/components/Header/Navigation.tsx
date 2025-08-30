import { Link } from 'react-router-dom'
import { useNavigation } from '@/shared/hooks/useNavigation'

export const Navigation = () => {
  const { navItems, isActiveRoute } = useNavigation()

  return (
    <nav className="w-full flex justify-center items-center px-4 py-[2vmax]">
      <div className=" w-full flex justify-between items-center gap-[4vmax]">
       
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-white">
            Kingdom
          </Link>
        </div>
        
 
        <div className="flex items-center ">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActiveRoute(item.path)
                  ? 'text-white bg-white bg-opacity-20'
                  : 'text-white text-opacity-90 hover:text-white hover:bg-white hover:bg-opacity-10'
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
