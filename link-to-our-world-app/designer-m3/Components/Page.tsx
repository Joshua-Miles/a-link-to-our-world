import { Href, router, usePathname } from "expo-router";
import { ReactNode, useEffect, useState } from "react";
import { NavigationProvider, StyledView } from "ui-core";

export type PageProps = Parameters<typeof StyledView>[0] & {
    navTransitionOutDuration?: number
    children: ReactNode
    onBeforeNaviage?: () => any
}

export function Page({ children, navTransitionOutDuration = 0, onBeforeNaviage, ...props }: PageProps) {
    const [navTransition, setNavTransition] = useState<null | 'in' | 'out' | 'preload'>('preload');

    useEffect(() => {
        if (navTransition === 'preload') setTimeout(() => setNavTransition('in'), 100);
        if (navTransition === 'in') setNavTransition(null);
    }, [ navTransition ])

    function onNavigate(path: Href) {
        if (navTransitionOutDuration === 0) {
            setNavTransition('in')
            onBeforeNaviage?.()
            router.push(path)
        } else {
            setNavTransition('out')
            onBeforeNaviage?.()
            setTimeout(() => {
                setNavTransition(null)
                router.push(path)
            }, navTransitionOutDuration)
        }
    }

    return (
        <NavigationProvider onNavigate={onNavigate}>
            <PageContainer
                {...props}
                // This addresses a really frustrating bug where _navTransitionIn
                //  stutters if the page contains a text input.
                // We let the page figure it's ish out first, then start the transition in animation.
                display={navTransition === 'preload' ? 'none' : 'flex'}
                forceState={{
                    _navTransitionIn: navTransition === 'in' || navTransition === 'preload',
                    _navTransitionOut: navTransition === 'out'
                }}
            >
                {children}
            </PageContainer>
        </NavigationProvider>
    )
}

export const PageContainer = StyledView
    .withInteractionState('_navTransitionIn', '_navTransitionOut')
    .style(() => ({
        flex: 1
    }))
