import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main content area */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
