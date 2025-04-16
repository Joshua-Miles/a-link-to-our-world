import { isLoading, useResult } from "@triframe/utils-react";
import { isAnyFailure } from "@triframe/ambassador";
import { getHealthMeter, listInventoryItems, setHealth } from "api";
import { Column, useDesignerTheme, timing, Row, RowReverse } from "designer-m3";
import { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import { Assets } from "../Assets"
import { useLatestCallback } from "../useLatestCallback"
import { wait } from "../wait"
import { useOnSwipe } from "./useOnSwipe";
import { WeaponTile } from "./WeaponTile";
import { HitScrim } from "./HitScrim";
import { GameOverAlert } from "./GameOverAlert";

export type Force = 'fire' | 'electric' | 'ice' | 'water'

export type InventoryItemSlug = Awaited<ReturnType<typeof listInventoryItems>>[number]['slug']


export type CombatProps = {
    asset: string;
    fortitude: number;
    damage: number;
    speed: number;
    onFinished?: () => any;
    forces?: Force[]
    extraItems?: InventoryItemSlug[]
}

export function Combat({ asset, fortitude, damage, speed, forces, onFinished, extraItems }: CombatProps) {
    const [ enemyHealth, setEnemyHealth ] = useState(100)
    const { spacing, colors } = useDesignerTheme()
    const [ selectedWeapon, setSelectedWeapon ] = useState<string | null>(null);
    const [ showHitScrim, setShowHitScrim ] = useState(false);
    const [ force, setForce ] = useState(getRandomForce());
    const inventoryItems = useResult(listInventoryItems)
    const playerHealthMeter = useResult(getHealthMeter);
    const hasFinished = useRef(false);

    function getRandomForce() {
        if (!forces) return null;
        return forces[Math.floor(Math.random()*forces.length)];
    }

    const weaponGroup1: InventoryItemSlug[] = [
        'sword',
        'master-sword',
    ]

    const weaponGroup2: InventoryItemSlug[] = [
        'fire-sword',
        'ice-sword',
        'electric-sword',
        'water-sword'
    ]

    const swipe = useOnSwipe(() => {
        if (forces && forces.length > 0) {
            setForce(getRandomForce())
        }
        let damage = 1;
        if (selectedWeapon && force && selectedWeapon.includes(force)) {
            damage = 10;
        }
        setEnemyHealth(enemyHealth - (100 / fortitude * damage))
    });

    const dealPlayerDamage = useLatestCallback(async () => {
        if (enemyHealth > 0 && playerHealth > 0) {
            setShowHitScrim(true)
            setHealth(playerHealth - damage)
            await wait(500)
            setShowHitScrim(false)
        }
    })

    useEffect(() => {
        if (enemyHealth === 0 && !hasFinished.current) {
            hasFinished.current = true;
            onFinished?.()
        }
    }, [ enemyHealth])

    useEffect(() => {
        const interval = setInterval(dealPlayerDamage, speed)
        return () => clearInterval(interval)
    }, [])

    if (isLoading(inventoryItems) || isLoading(playerHealthMeter) || isAnyFailure(playerHealthMeter)) return null;

    const playerHealth = playerHealthMeter.health;

    const playerPiecesOfHealth = new Array(playerHealth).fill(1)

    const itemSlugs = inventoryItems.map( item => item.slug);

    for (let extraItem of extraItems ?? []) {
        if (!itemSlugs.includes(extraItem)) {
            itemSlugs.push(extraItem)
        }
    }

    const swipeHandlers = selectedWeapon !== null ? {...swipe.panHandlers} : {};

    const assetWithForce = force ? `${force}-${asset}` : asset;

    return (
        <Column flex={1} alignItems="center">
            <HitScrim gap={4} width="100%" px={16} showHit={showHitScrim}>
                {playerPiecesOfHealth.map( () => (
                    <Image 
                        source={Assets['health']}
                        style={{
                            width: 20,
                            height: 20,
                            objectFit: 'contain'
                        }}
                    />
                ))}
            </HitScrim>
            <Column
                width="50%"
                backgroundColor={swipe.isPressed ? colors.roles.errorContainer : colors.roles.surface}
                transform={[ { scale: swipe.isPressed ? 0.85 : 1 }]}
                transitions={{
                    backgroundColor: timing(250),
                    transform: [ { scale: timing(250) }]
                }}
            >
                <Image style={{ width: 200, height: 200, objectFit: 'contain' }} source={Assets[assetWithForce]} {...swipeHandlers} />
            </Column>
            <Row width="50%" height={spacing.md} backgroundColor={colors.roles.surfaceContainerHighest}>
                <Row backgroundColor={colors.roles.error} height={spacing.md} width={`${enemyHealth}%`} transitions={{
                    width: timing(100)
                }}/>
            </Row>
            <Row mt={spacing.lg} width="100%">
                {weaponGroup1.filter(slug => itemSlugs.includes(slug)).map( slug => (
                   <WeaponTile key={slug} slug={slug} isSelected={selectedWeapon === slug} onPress={() => setSelectedWeapon(slug)} />
                ))}
            </Row>
            <Row width="100%">
                {weaponGroup2.filter(slug => itemSlugs.includes(slug)).map( slug => (
                    <WeaponTile key={slug} slug={slug} isSelected={selectedWeapon === slug} onPress={() => setSelectedWeapon(slug)} />
                ))}
            </Row>
            <GameOverAlert isOpen={playerHealth <= 0} onContinue={() => {
                setHealth(3)
                setEnemyHealth(100)
            }}/>
        </Column>
    );
}
