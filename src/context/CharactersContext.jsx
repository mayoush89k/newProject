import { createContext, useContext, useState } from "react";

export const CharactersContext = createContext();

export const CharactersProvider =({children}) => {
    const [characters , setCharacters] = useState([])

    const changeCharacters = (updatedCharacters) => {
        setCharacters(updatedCharacters)
    }
    return (
        <CharactersContext.Provider value={{characters , changeCharacters}}>
            {children}
        </CharactersContext.Provider>
    );
};

export const useCharacter = () => useContext(CharactersContext)