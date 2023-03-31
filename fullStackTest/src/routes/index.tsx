import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Empresa from '../Pages/Empresa';
import Fornecedor from '../Pages/Fornecedor';
import Home from '../Pages/Home';
import EmpresaSignUp from '../shared/forms/empresa-signup/EmpresaSignUp';
import FornecedorSignUp from '../shared/forms/fornecedor-signup/FornecedorSignUp';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<Home/>}/>
      
      <Route path="criar-empresa" element={<EmpresaSignUp/>}/>
      <Route path="empresa" element={<Empresa/>}/>


      <Route path="criar-fornecedor" element={<FornecedorSignUp/>}/>
      <Route path="fornecedor" element={<Fornecedor/>}/>

      <Route path="*" element={<Home/>}/>
    </Routes>
  )
}

export default AppRoutes