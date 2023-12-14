import { useEffect, useRef, useState } from "react"
import { numeroAlAzar } from "../utils/utils"

const timePulse = 30; // Tiempo en segundos entre el inicio de pulso y otro

const Pulse = () => { // Genera un pulso en un lugar random de la pantalla
    const [pulso, setPulso] = useState(false)

    const pulsoRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setInterval(() => {
            setPulso(pulso => !pulso)
        }, timePulse*1000/2)
    }, [])

    useEffect(() => {
        const divPulso = pulsoRef.current
        if (!divPulso) return;

        if (pulso) {
            divPulso.style.setProperty("top", `${numeroAlAzar(0, 100)}%`)
            divPulso.style.setProperty("left", `${numeroAlAzar(0, 100)}%`)
            divPulso.classList.add("pulse")

        } else {
            divPulso.classList.remove("pulse")
        }
    }, [pulso])

    return (
        <div className='fixed -z-30 top-0 h-screen w-screen'>
            <div ref={pulsoRef} className="bg-custom-pulse scale-0 w-screen h-[100vw] shadow-2xl rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 border border-blue-700"></div>
        </div>
    )
}

export default Pulse
