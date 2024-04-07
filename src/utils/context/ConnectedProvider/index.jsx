import React from "react";
import { useState, createContext } from "react";

export const ConnectedContext = createContext();
export const ConnectedProvider = ({children}) => {
    const [connected, setConnected] = useState ('Not connected');
    return(
        <ConnectedContext.Provider value = {{ connected, setConnected}}>
            {children}
        </ConnectedContext.Provider>
    )
}

