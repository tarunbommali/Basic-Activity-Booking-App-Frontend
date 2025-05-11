import {Outlet} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export const AppLayout = () => {
  return (
    <div>
        <Header/>
        <div className='min-h-[90vh]'><Outlet /></div>
        <Footer/>
    </div>
  )
}

export default AppLayout