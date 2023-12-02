import { createContext, useContext, useState } from 'react'
import { DEFAULT_APP_CONTEXT, TAppContext } from '../../constants'

const AppContext = createContext<TAppContext | undefined>(undefined)
export type TThemeContextProps = {
    context: TAppContext
    setContext: () => void
}
export const ThemeProvider = ({ children }) => {
    const [context, setContext] = useState(DEFAULT_APP_CONTEXT)

    // Include a function to update the theme in the context value
    const contextValue = {
        context,
        setContext, // This allows components to directly update the theme
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export const useContent = (): TThemeContextProps => {
    return useContext(AppContext)
}
