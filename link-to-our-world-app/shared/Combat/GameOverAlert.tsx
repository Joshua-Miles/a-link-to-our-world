import { Button, Column, Headline, Theme, timing, useDesignerTheme } from "designer-m3";
import { ArrowRightIcon } from "designer-m3/icons";
import { useEffect, useState } from "react";
import { wait } from "../wait";
import { Soundtrack } from "../Soundtrack";

type GameOverScrimProps = {
    isOpen: boolean
    onContinue: () => any
}

export function GameOverAlert({ isOpen, onContinue }: GameOverScrimProps) {
    const theme = useDesignerTheme()
    const [ canContinue, setCanContinue ] = useState(false)

    function handleContinue() {
        setCanContinue(false);
        onContinue();
    }

    useEffect(() => {
       if (isOpen) {
        wait(3000).then( () => setCanContinue(true) )
       } 
    }, [ isOpen ])

    return (
        <GameOverScrim display={isOpen ? 'flex' : 'none'}>
            <Soundtrack isPlaying={isOpen} asset="game-over" push/>
            <Headline.Large fontFamily="TriForce" color={theme.colors.roles.error}>
                Game Over
            </Headline.Large>
            <Button.Text onPress={handleContinue} disabled={!canContinue} opacity={canContinue ? 1 : 0}>
                Continue <ArrowRightIcon />
            </Button.Text>
        </GameOverScrim>
    )
}

const GameOverScrim = Column.style((theme: Theme) => ({
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.roles.surface,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
    opacity: 0,
    _displayed: {
        opacity: 1
    },
    transitions: {
        opacity: timing(500)
    }
}))

