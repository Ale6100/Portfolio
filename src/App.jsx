import './App.css'
import PersonalContextProvider from "./components/PersonalContext";
import NavBar from './components/NavBar'
import SobreMi from './components/SobreMi'
import Proyectos from './components/Proyectos'
import Tecnologias from './components/Tecnologias'
import Contacto from './components/Contacto'
import Footer from './components/Footer'

function App() {
  return (
    <PersonalContextProvider>
      <NavBar />

      <main className="px-3 relative">
        <SobreMi />
        <Proyectos />
        <Tecnologias />
        <Contacto />
      </main>

      <Footer />
    </PersonalContextProvider>
  )
}

export default App
