import './sass/style.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Details from './pages/Home/Details';
const router = createBrowserRouter([
  {
    path: '/pokedex/',
    element: <Home />,
  },
  {
    path: '/pokedex/pokemon/:id',
    element: <Details />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
