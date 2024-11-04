import React, { createContext, useContext, useState } from 'react';


const UserContext = createContext();


export function UserProvider({ children }) {
    const [userId, setUserId] = useState(null); 

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
}

// Hook para usar el contexto
export function useUser() {
    return useContext(UserContext);
}
