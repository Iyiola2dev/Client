import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Auth from './auth/Auth'
import Admin from './pages/admin-view/Admin'


const App = () => {
  return (
    <div className='flex flex-col overflow-hidden bg-red-500'>

<h1>Lexicon</h1>

<Routes>
<Route path='/*' element={<Dashboard/>}/>
<Route path='/auth/*' element={<Auth/>}/>
<Route path='/admin/*' element={<Admin/>}/> 
</Routes>
    </div>
  )
}

export default App