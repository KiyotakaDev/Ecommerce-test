import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Norma */}
      <Route path='/' >
        <Route index element={<div>Home</div>} />
      </Route>

      {/* Admin */}
      <Route path='/admin/*' element={<AdminLayout />} >
        <Route path='products' element={<div>Producst</div>} />
        <Route path='orders' element={<div>Orders</div>} />
        <Route path='settings' element={<div>Settings</div>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes