import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors duration-300">
        <Header />
        <main className="flex-1">
          <Home />
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App
