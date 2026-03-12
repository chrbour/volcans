import { useState, createContext } from "react";

export const ConnectedContext = createContext();
export const ConnectedProvider = ({children}) => {
    const [connected, setConnected] = useState ('Not connected');
    if(connected === 'NotConnected'){
        Storage.clear();
    }
    return(
        <ConnectedContext.Provider value = {{ connected, setConnected}}>
            {children}
        </ConnectedContext.Provider>
    )
}

