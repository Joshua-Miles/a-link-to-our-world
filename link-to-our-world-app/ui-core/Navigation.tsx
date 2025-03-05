import { Href, router } from "expo-router";
import { createContext, ReactNode, useContext } from "react";

export type OnNavigate = (path: Href) => any;

type NavigationContext = {
  onNavigate: OnNavigate;
};

const NavigationContext = createContext<NavigationContext | null>(null);

export type NavigationProviderProps = {
    onNavigate?: OnNavigate;
    children: ReactNode;
};

export function NavigationProvider({ onNavigate = router.push, children }: NavigationProviderProps) {
  return (
    <NavigationContext.Provider value={{ onNavigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useOnNavigate() {
    const navigationContext = useContext(NavigationContext);
    if (navigationContext === null) throw Error('Cannot use "useOnNavigate" outside of NavigationProvider')
    return navigationContext.onNavigate;
}
