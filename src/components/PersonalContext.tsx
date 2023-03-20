import React, { createContext, useState } from "react";

interface PersonalContextValue {
    sobreMiMontado: boolean;
    setSobreMiMontado: React.Dispatch<React.SetStateAction<boolean>>;
    proyectosMontado: boolean;
    setProyectosMontado: React.Dispatch<React.SetStateAction<boolean>>;
    tecnologiasMontado: boolean;
    setTecnologiasMontado: React.Dispatch<React.SetStateAction<boolean>>;
    misEstudios: boolean;
    setMisEstudios: React.Dispatch<React.SetStateAction<boolean>>;
    experiencia: boolean;
    setExperiencia: React.Dispatch<React.SetStateAction<boolean>>;
    contactoMontado: boolean;
    setContactoMontado: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PersonalContext = createContext<PersonalContextValue | undefined>(undefined);
interface PersonalContextProviderProps {
    children: React.ReactNode;
}

const PersonalContextProvider = ({ children }: PersonalContextProviderProps) => {
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
