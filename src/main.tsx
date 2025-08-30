import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import Contact from './pages/Contact'
import MyChurch from './pages/MyChurch'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'my-church',
        element: <MyChurch />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
