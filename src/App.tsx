import {createBrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import {AppLayout} from './components/AppLayout';
import Home from './pages/Home';


const routes = [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      }
  ]
  }
]
export const router = createBrowserRouter(routes);
