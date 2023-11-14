import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import IndexPage from './pages/IndexPage'

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <h1 className='display-2'>Wrong page!</h1>,
      children: [
        {
          index: true,
          element: <IndexPage />
        }
      ]
    }
  ])


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
  )