import { Assets, dialog, Dialog } from "app/shared"
import { Column, Row, useDesignerTheme, timing } from "designer-m3"
import { Image } from "react-native"
import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors';
import { useEffect, useRef, useState } from "react";


export default () => {
    return (
        <Column flex={1}>
            <Row flex={1} justifyContent="center" alignItems="center">
                <Image style={{ width: '100%', objectFit: 'contain' }} source={Assets['moblin']}/>
            </Row>
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
            <Combat fortitude={3}/>
        </Column>
    )
}

type CombatProps = {
    fortitude: number;
}

function Combat({ fortitude }: CombatProps) {
    const [ health, setHealth ] = useState(100)
    const { spacing, colors } = useDesignerTheme()

    useOnFlick(() => {
        setHealth(health - (100 / fortitude))
    })

    return (
        <Column flex={1} alignItems="center">
            <Row width="50%" height={spacing.md} backgroundColor={colors.roles.surfaceContainerHighest}>
                <Row backgroundColor={colors.roles.error} height={spacing.md} width={`${health}%`} transitions={{
                    width: timing(1000)
                }}/>
            </Row>
        </Column>
    );
}


type GestureData = {
    downCapturedAt: number | null;
}

function useOnFlick(callback: () => any) {
    const callbackRef = useRef<() => any>(callback);
    callbackRef.current = callback;
    const { current: gestureData } = useRef<GestureData>({ downCapturedAt: null });

    const updateInterval = 200;

    const downThreshold = -150;

    const upThreshold = 150;

    const timeLimit = 1000;


    function handleData(data: DeviceMotionMeasurement) {
        const rotationRate = data.rotationRate;
        if(!rotationRate) return;

        const { alpha } = rotationRate;
        if (alpha < downThreshold) {
            gestureData.downCapturedAt = Date.now();
        } else if (alpha > upThreshold && gestureData.downCapturedAt !== null && (Date.now() - gestureData.downCapturedAt) < timeLimit) {
            gestureData.downCapturedAt = null;
            callbackRef.current();
        }
    }

    useEffect(() => {
        DeviceMotion.setUpdateInterval(updateInterval)
        const subscription = DeviceMotion.addListener(handleData);
        return () => subscription.remove();
    }, []);
}