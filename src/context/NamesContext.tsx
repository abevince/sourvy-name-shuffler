import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Names {
  [key: string]: string
}
export interface ContextValue {
  names: Names
  setNames: React.Dispatch<React.SetStateAction<Names>>
}

const defaultProfileState: ContextValue = {
  names: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNames: (): void => {},
}

export const NamesContext = createContext<ContextValue>(defaultProfileState)

export const useNames = (): ContextValue => useContext(NamesContext)

export const NamesProvider: React.FC = ({ children }) => {
  const [names, setNames] = useState<Names>({})
  useEffect(() => {
    const getNamesFromLocalStorage = () => {
      const listOfNames = localStorage.getItem('__STORAGE_KEY__')

      if (listOfNames === null || listOfNames === '') {
        return setNames({})
      }
      setNames(JSON.parse(listOfNames))
    }
    getNamesFromLocalStorage()
  }, [])

  useEffect(() => {
    localStorage.setItem('__STORAGE_KEY__', JSON.stringify(names))
  }, [names])

  return (
    <NamesContext.Provider value={{ names, setNames }}>
      {children}
    </NamesContext.Provider>
  )
}
