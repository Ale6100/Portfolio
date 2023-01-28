import React, { createContext, useState } from "react";

export const PersonalContext = createContext()

const PersonalContextProvider = ({ children }) => {
    const [sobreMiMontado, setSobreMiMontado] = useState(false); // Estado que representa si el componente SobreMi está montado
    const [proyectosMontado, setProyectosMontado] = useState(false);
    const [tecnologiasMontado, setTecnologiasMontado] = useState(false);
    const [contactoMontado, setContactoMontado] = useState(false);

    return (
        <PersonalContext.Provider value={{ sobreMiMontado, setSobreMiMontado, proyectosMontado, setProyectosMontado, tecnologiasMontado, setTecnologiasMontado, contactoMontado, setContactoMontado }}>
            {children}
        </PersonalContext.Provider>
    );
}

export default PersonalContextProvider;
