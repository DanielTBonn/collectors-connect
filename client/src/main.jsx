import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import IndexPage from './pages/IndexPage'
import LoggedInPage from './pages/LoggedInPage.jsx'
// import TestPage from './pages/TestPage';
// import TestImage from './pages/TestImage.jsx'
import SearchPage from './pages/SearchPage';

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <h1 className='display-2'>Wrong page!</h1>,
      children: [
        {
            index: true,
            element: <IndexPage />
        },
        {
            path: '/me',
            element: <LoggedInPage />
        },
        // {
        //     path: '/testpage',
        //     element: <TestPage />
        // },
        // {
        //   path: '/testimage',
        //   element: <TestImage />
        // },
        {
          path: '/search',
          element: <SearchPage />
        }
      ]
    }
  ])


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
  )