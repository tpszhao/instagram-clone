import React, { useReducer, createContext } from 'react';
import infiniteLoaderReducer, {initialState} from 'Reducers/infiniteLoaderReducer'

export const PhotoContext = createContext();


export default function PhotoContextProvider({children}) {
    const [state, dispatch] = useReducer(infiniteLoaderReducer, initialState);
    return (
        <PhotoContext.Provider value={{state,dispatch}}>
            {children}
        </PhotoContext.Provider>
    )
}

