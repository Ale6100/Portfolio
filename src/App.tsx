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
import { useEffect } from 'react';

const { MODE } = import.meta.env;

function App() {
    useEffect(() => {
        if (MODE !== 'development') location.href = 'https://portfolioalejandrop.vercel.app';
    }, []);

    return (
        <>
        <NavBar />
        {/* El link está en caso de que la redirección falle */}
        <a className='fixed bottom-[5dvw] right-[5dvw] bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-3 py-2 rounded-xl text-sm max-md:text-xs font-medium hover:from-emerald-600 hover:to-blue-700 hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-lg hover:shadow-xl z-50' href="https://portfolioalejandrop.vercel.app/" target="_blank" rel="noopener noreferrer">🚀 Ir a la versión actualizada</a>
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
        </>
    )
}

export default App
