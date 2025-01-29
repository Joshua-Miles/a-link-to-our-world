import React, { createContext, useContext } from 'react';
import { InteractionStateIdentifier } from './StyledComponentInterface'

type ParentContextData = {
    parentInteractionStates: InteractionStateIdentifier[]
    parentTextColor: string
}

const ParentContext = createContext<ParentContextData>({
    parentInteractionStates: [],
    parentTextColor: 'black'
});

export const useParentContext = () => useContext(ParentContext)

type ParentProviderProps = {
    children: React.ReactNode
    interactionStates: InteractionStateIdentifier[]
    textColor: string
}

export function ParentContextProvider({ interactionStates, textColor, children }: ParentProviderProps) {
    return (
        <ParentContext.Provider value={{ parentInteractionStates: interactionStates, parentTextColor: textColor }}>
            {children}
        </ParentContext.Provider>
    )
}
