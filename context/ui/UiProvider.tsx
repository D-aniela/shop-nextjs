import { FC, PropsWithChildren, useReducer } from 'react'
import { uiReducer, UiContext } from './'

export interface UiState {
  isMenuOpen: boolean
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
}

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const toggleSideMenu = () => {
    dispatch({ type: '[Ui] - ToggleMenu' })
  }

  return (
    <UiContext.Provider
      value={{
        ...state,
        //  Methods
        toggleSideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  )
}
