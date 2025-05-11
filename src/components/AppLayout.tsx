import {Outlet} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export const AppLayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default AppLayout