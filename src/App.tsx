import NavBar from './components/NavBar'
import SobreMi from './components/SobreMi'
import Proyectos from './components/Proyectos'
import Tecnologias from './components/Tecnologias'
import MisEstudios from './components/MisEstudios';
import Experiencia from './components/Experiencia';
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import Pulse from './components/Pulse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
        <NavBar />
        <main className="px-3 mx-auto relative max-w-5xl">
            <SobreMi />
            <Proyectos />
            <Tecnologias />
            <MisEstudios />
            <Experiencia />
            <Contacto />
            <ToastContainer />
        </main>
        <Footer />
        <Pulse />
        <a className='fixed bottom-[1vw] right-[1vw] hover:font-semibold text-sm max-md:text-xs hover:scale-105 hover:translate-x-[-0.25vw] transition-all duration-100' href="https://portfolioalejandrop.vercel.app/" target="_blank" rel="noopener noreferrer">Ver nueva versión no terminada</a>
        </>
    )
}

export default App
