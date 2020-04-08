import React, { useReducer, createContext } from "react";
import infiniteLoaderReducer, {
  initialState,
} from "reducers/infiniteLoaderReducer";

export const PhotoDataContext = createContext<any>(undefined);

interface Props {
  children: any;
}

export default function PhotoDataContextProvider({ children }: any) {
  const [state, dispatch] = useReducer(infiniteLoaderReducer, initialState);
  return (
    <PhotoDataContext.Provider value={[state, dispatch]}>
      {children}
    </PhotoDataContext.Provider>
  );
}
