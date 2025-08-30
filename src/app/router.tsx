import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { Homepage } from '@/features/home/pages/Homepage'
import { Contact } from '@/features/contact/pages/Contact'
import { MyChurch } from '@/features/church/pages/MyChurch'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
