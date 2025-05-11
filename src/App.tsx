import {createBrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import {AppLayout} from './components/AppLayout';
import Home from './pages/Home';
import Bookings from './pages/Bookings';
import HostActivities from './pages/HostActivities'

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
      },
      {
        path: "/bookings",
        element: <Bookings/>
      },
      {
        path:"/activities",
        element: <HostActivities/>
      }
  ]
  }
]
export const router = createBrowserRouter(routes);
