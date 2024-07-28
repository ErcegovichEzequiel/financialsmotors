import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Adminsitrador from '../Screens/Adminsitrador'
import Pantalla from '../Screens/Pantalla'


const ReouterList = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Pantalla />} />
        <Route path='/Adminsitrador' element={<Adminsitrador />} />
      </Routes>
    </div>
  )
}

export default ReouterList