import React, { createContext, useState } from "react";

export const PersonalContext = createContext()

const PersonalContextProvider = ({ children }) => {
    const [sobreMiMontado, setSobreMiMontado] = useState(false); // Estado que representa si el componente SobreMi está montado
    const [proyectosMontado, setProyectosMontado] = useState(false);
    const [tecnologiasMontado, setTecnologiasMontado] = useState(false);
    const [misEstudios, setMisEstudios] = useState(false);
    const [experiencia, setExperiencia] = useState(false);
    const [contactoMontado, setContactoMontado] = useState(false);

    return (
        <PersonalContext.Provider value={{ sobreMiMontado, setSobreMiMontado, proyectosMontado, setProyectosMontado, tecnologiasMontado, setTecnologiasMontado, misEstudios, setMisEstudios, experiencia, setExperiencia, contactoMontado, setContactoMontado }}>
            {children}
        </PersonalContext.Provider>
    );
}

export default PersonalContextProvider;
