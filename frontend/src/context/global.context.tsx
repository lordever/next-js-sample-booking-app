"use client";

import React, {createContext, useContext, useState} from "react";

interface GlobalContextProps {
    unreadCount: number;
    setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}


const GlobalContext = createContext<GlobalContextProps>({
    unreadCount: 0,
    setUnreadCount: () => {
    }
});

export function GlobalProvider({children}: { children: React.ReactNode }) {
    const [unreadCount, setUnreadCount] = useState(0);

    return (
        <GlobalContext.Provider value={{unreadCount, setUnreadCount}}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}