import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Auth from './auth/Auth'
import Admin from './pages/admin-view/Admin'
import Shopping from './pages/shopping-view/Shopping'
import NotFound from './pages/not-found'


const App = () => {
  return (
    <div className='flex flex-col overflow-hidden bg-red-500'>



<Routes>
<Route path='/*' element={<Dashboard/>}/>
<Route path='/auth/*' element={<Auth/>}/>
<Route path='/admin/*' element={<Admin/>}/> 
<Route path="/shop/*" element={<Shopping/>}/>

{/* this is too handle other routes */}
<Route path="*" element={<NotFound/>}/>
</Routes>
    </div>
  )
}

export default App