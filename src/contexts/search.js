import React, { createContext, useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchContextData = {
    recentSearches: [],
    getRecentSearchesInMemory: () => { },
    setRecentSearchesInMemory: (param) => { },
    deleteAllSearch: () => { },
    deleteSearchById: (param) => { },
}

const SearchesContext = createContext(SearchContextData);

export function SearchProvider({ children }) {
    const [recentSearches, setResentSearchs] = useState([]);

    const getRecentSearchesInMemory = useCallback(async () => {
        const getSearchesInMemory = await AsyncStorage.getItem('@SEARCH_MUSIC');

        if (JSON.parse(getSearchesInMemory)) {
            setResentSearchs(JSON.parse(getSearchesInMemory));
        }
    }, [recentSearches]);

    const setRecentSearchesInMemory = useCallback(async (param) => {
        const order = param.sort((a, b) => a.id < b.id);

        await AsyncStorage.setItem('@SEARCH_MUSIC', JSON.stringify(order));
    }, []);

    const deleteAllSearch = async () => {
        setResentSearchs([]);
        await AsyncStorage.removeItem('@SEARCH_MUSIC');
    }

    const deleteSearchById = async (param) => {
        setResentSearchs(param);
        await AsyncStorage.setItem('@SEARCH_MUSIC', JSON.stringify(param));
    }

    return (
        <SearchesContext.Provider
            value={{
                recentSearches,
                getRecentSearchesInMemory,
                setRecentSearchesInMemory,
                deleteAllSearch,
                deleteSearchById
            }}
        >
            {children}
        </SearchesContext.Provider>
    )

}

export default SearchesContext;