import React from 'react'
import { AppProvider } from './context/AppContext'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
    <AppProvider>
      <Outlet />
    </AppProvider>
    </AuthProvider>
  )
}

export default App
