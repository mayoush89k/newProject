import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider =({children}) => {
    const [theme , setTheme] = useState(true)

    const changeTheme = () => {
        setTheme(old => !old)
    }
    return (
        <ThemeContext.Provider value={{theme , changeTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext)