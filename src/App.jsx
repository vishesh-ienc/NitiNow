import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import { AppProvider } from './context/AppContext'
import ToggleButton from './components/togglebutton'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <div className="fixed top-4 right-4 z-[100]">
          <ToggleButton />
        </div>
        <Header />
        <main className="flex-1">
          <Home />
        </main>
      </div>
    </AppProvider>
  )
}

export default App
