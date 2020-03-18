import React, { useReducer, createContext } from 'react';
import infiniteLoaderReducer, {initialState} from 'TestReducers/infiniteLoaderReducer'

export const PhotoDataContext = createContext();


export default function PhotoDataContextProvider({children}) {
    const [state, dispatch] = useReducer(infiniteLoaderReducer, initialState);
    return (
        <PhotoDataContext.Provider value={{state,dispatch}}>
            {children}
        </PhotoDataContext.Provider>
    )
}

