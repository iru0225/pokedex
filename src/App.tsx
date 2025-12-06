import { Navigate, useRoutes } from 'react-router-dom'
import HomePage from './pages/home'
import PageLayout from './pages/layout'
import Detail from './pages/detail'

function App() {
  const appRoutes = [
    {
      path: '/',
      element: <PageLayout />,
      children: [
        {
          index: true,
          element: <Navigate to='/home' replace />
        },
        {
          path: 'home',
          element: <HomePage />,
          exact: true
        },
        {
          path: '/pokemon/:id',
          element: <Detail />
        }
      ]
    }
  ]

  const pageRoutes = useRoutes(appRoutes)
  return <>{pageRoutes}</>
}

export default App
