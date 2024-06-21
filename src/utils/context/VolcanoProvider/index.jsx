import React, {useState, createContext} from 'react'

export const VolcanoContext = createContext();
export const VolcanoProvider = ({children}) => {
    const [volcanoId, setVolcanoId] = useState ('');
    return(
        <VolcanoContext.Provider value = {{ volcanoId, setVolcanoId}}>
            {children}
        </VolcanoContext.Provider>
    )
}