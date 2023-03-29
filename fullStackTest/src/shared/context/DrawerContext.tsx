import React from 'react'

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void
}

interface IDrawerProviderProps {
  children: React.ReactNode
}

const DrawerContextData = React.createContext({} as IDrawerContextData)

export const useDrawerContext = () => {
  return React.useContext(DrawerContextData)
}

const DrawerProvider: React.FC<IDrawerProviderProps> = ({children}) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  const toggleDrawerOpen = React.useCallback(() => {
    setIsDrawerOpen(oldDrawerState => !oldDrawerState)
  }, [])


  return (
    <DrawerContextData.Provider value={{isDrawerOpen, toggleDrawerOpen}}>
      {children}
    </DrawerContextData.Provider>
  )
}

export default DrawerProvider