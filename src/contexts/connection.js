import React, { createContext, useCallback, useState } from "react"
import * as Network from "expo-network";

const ConnectionContextData = {
    isConnection: null,
    getNetworkStateAsync: () => { },
}

const ConnectionContext = createContext(ConnectionContextData);

export function ConnectionProvider({ children }) {
    const [isConnection, setIsConnection] = useState(null);

    const getNetworkStateAsync = useCallback(async () => {
        const connection = await Network.getNetworkStateAsync();
        setIsConnection(connection.isInternetReachable);
    }, [])

    return (
        <ConnectionContext.Provider
            value={{
                isConnection,
                getNetworkStateAsync,
            }}
        >
            {children}
        </ConnectionContext.Provider>
    )
}

export default ConnectionContext;