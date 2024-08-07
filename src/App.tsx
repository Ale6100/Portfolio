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
        </>
    )
}

export default App
