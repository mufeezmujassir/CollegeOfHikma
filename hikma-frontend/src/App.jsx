
import './App.css'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
      <div className='app-layout'>
        <Navbar />
        <main className='main-content'>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
