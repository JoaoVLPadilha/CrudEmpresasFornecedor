import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../Pages/Home';
import EmpresaSignUp from '../shared/forms/empresa-signup/EmpresaSignUp';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<Home/>}/>
      <Route path="criar-empresa" element={<EmpresaSignUp/>}/>
      <Route path="*" element={<Home/>}/>
    </Routes>
  )
}

export default AppRoutes