import { Assets, dialog, Dialog } from "app/shared"
import { Column, Row, useDesignerTheme, timing } from "designer-m3"
import { Image, PanResponder, useWindowDimensions } from "react-native"
import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors';
import { useEffect, useRef, useState } from "react";
import { isLoading, useResult } from "@triframe/utils-react";
import { listInventoryItems } from "api";


export default () => {
    return (
        <Column flex={1}>

            {/* <Dialog
                flex={1}
                tree={dialog('Hey!', {
                    'What': dialog('Lets fight', {
                        'No thank you': dialog('P l e a s e?'),
                        'Fine': dialog('Lets GOOOOOO')
                    }),
                    'How': dialog('Lets fight'),
                    'When': dialog('Lets fight'),
                })}
            /> */}
            <Combat fortitude={50} asset="moblin" />
        </Column>
    )
}

type CombatProps = {
    asset: string;
    fortitude: number;
}

type InventoryItemSlug = Awaited<ReturnType<typeof listInventoryItems>>[number]['slug']

function Combat({ asset, fortitude }: CombatProps) {
    const [ health, setHealth ] = useState(100)
    const { spacing, colors } = useDesignerTheme()
    const [ selectedWeapon, setSelectedWeapon ] = useState<string | null>(null);
    const inventoryItems = useResult(listInventoryItems)

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
        setHealth(health - (100 / fortitude))
    });

    if (isLoading(inventoryItems)) return null;

    const itemSlugs = inventoryItems.map( item => item.slug);

    const swipeHandlers = selectedWeapon !== null ? {...swipe.panHandlers} : {};

    return (
        <Column flex={1} alignItems="center">
            <Column
                width="50%"
                backgroundColor={swipe.isPressed ? colors.roles.errorContainer : colors.roles.surface}
                transform={[ { scale: swipe.isPressed ? 0.85 : 1 }]}
                transitions={{
                    backgroundColor: timing(250),
                    transform: [ { scale: timing(250) }]
                }}
            >
                <Image style={{ width: '100%', objectFit: 'contain' }} source={Assets[asset]} {...swipeHandlers} />
            </Column>
            <Row width="50%" height={spacing.md} backgroundColor={colors.roles.surfaceContainerHighest}>
                <Row backgroundColor={colors.roles.error} height={spacing.md} width={`${health}%`} transitions={{
                    width: timing(1000)
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
        </Column>
    );
}

type WeaponTileProps = {
    slug: string
    isSelected: boolean
    onPress: () => any;
}

function WeaponTile({ slug, isSelected, onPress }: WeaponTileProps) {
    const { colors, spacing } = useDesignerTheme();
    const { width } = useWindowDimensions();
    return (
        <Column justifyContent="center" alignItems="center" height={width / 4} width={width / 4} borderStyle="solid" borderWidth={spacing.hairline}  borderColor={isSelected ? colors.roles.primary : colors.roles.outline} onPress={onPress}>
            <Image style={{ width: '100%', objectFit: 'contain' }} source={Assets[slug]}/>
        </Column>
    )
}


type Swipe = {
    startingX: number
    startingY: number
    startingTimestamp: number
    successTimestamp?: number
}

function useOnSwipe(callback: () => any) {
    const timeLimit = 250;
    const minimumDistance = 30;

    const [ press, setPress ] = useState<Swipe | null>(null);
    const pressRef = useRef(press);
    pressRef.current = press;
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    function dismissPress(timestamp: number) {
        const press = pressRef.current;
        if (!press) return
        if (press.startingTimestamp === timestamp) setPress(null);
    }

    const responder = useRef(
        PanResponder.create({
          // Ask to be the responder:
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
            true,

          onPanResponderGrant: (evt, gestureState) => {
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
            const { pageX, pageY } = evt.nativeEvent;
            const now = Date.now();
            setPress({
                startingX: pageX,
                startingY: pageY,
                startingTimestamp: now
            })
            setTimeout(() => dismissPress(now), timeLimit)
          },
          onPanResponderMove: (evt, gestureState) => {
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
            const press = pressRef.current;
            if (!press || press.successTimestamp) return;
            const { pageX, pageY } = evt.nativeEvent;
            const distance = Math.sqrt((pageX - press.startingX)**2 + (pageY - press.startingY)**2)
            if (distance > minimumDistance) {
                setPress({ ...press, successTimestamp: Date.now() })
                callbackRef.current();
            }
          },
          onPanResponderTerminationRequest: (evt, gestureState) =>
            true,
          onPanResponderRelease: (evt, gestureState) => {
            setPress(null)
          },
          onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
          },
          onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
          },
        }),
      ).current;

    return {
        ...responder,
        isPressed: press !== null
    }
}
