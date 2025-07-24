import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Items from './components/Items.jsx'

const router = createBrowserRouter(
  [
    {path: '/', element: <App />},
    {path: '/:category_id/items', element: <Items />}
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
