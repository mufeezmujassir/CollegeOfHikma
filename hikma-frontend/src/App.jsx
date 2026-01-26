
import './App.css'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AppRoutes from './routes/AppRoutes'
function App() {

  return (
    
    <div className='app-layout'>
      <Navbar />
      <main className='main-content'>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
