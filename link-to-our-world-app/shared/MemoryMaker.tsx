import { LocalFileReference } from '@triframe/ambassador';
import { saveMemory } from 'api';
import { Button, Column, IconButton, Label, Row, useDesignerTheme } from 'designer-m3';
import { CameraIcon, RotateIcon } from 'designer-m3/icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import { useRef, useState } from 'react';

export type MemorySlug = Parameters<typeof saveMemory>[0]

export type MemoryMakerProps = {
    slug: MemorySlug
    onComplete?: () => any
}

export function MemoryMaker ({ slug, onComplete  }: MemoryMakerProps) {
    const { spacing, colors } = useDesignerTheme();
    const [facing, setFacing] = useState<CameraType>('front');
    const cameraViewRef = useRef<CameraView>(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [ saving, setSaving ] = useState(false);

    if (!permission) {
      // Camera permissions are still loading.
      return <Row />;
    }

    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <Column p={spacing.md} justifyContent="center" flex={1}>
            <Label.Large>We need your permission to show the camera</Label.Large>
            <Button.Elevated onPress={requestPermission}>
                Grant Permission
            </Button.Elevated>
        </Column>
      );
    }

    if (saving) {
        return (
            <Column flex={1} justifyContent='center'>
                <Label.Large>Saving...</Label.Large>
            </Column>
        )
    }

    function toggleCameraFacing() {
      setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function takePicture() {
        const cameraView = cameraViewRef.current;
        if (!cameraView) return;
        const result = await cameraView.takePictureAsync();
        if (!result) return;
        setSaving(true)
        await saveMemory(slug, LocalFileReference.fromURI(result.uri))
        onComplete?.();
    }

    return (
        <Column flex={1}>
            <CameraView ref={cameraViewRef} facing={facing} style={{ flex: 1, justifyContent: 'flex-end' }} />
            <Row py={spacing.sm} justifyContent='center' backgroundColor={colors.roles.surfaceContainerLow}>
                <IconButton.Standard onPress={takePicture}>
                    <CameraIcon />
                </IconButton.Standard>
                <IconButton.Standard onPress={toggleCameraFacing} position='absolute' right={spacing.sm} top={spacing.sm}>
                    <RotateIcon />
                </IconButton.Standard>
            </Row>
        </Column>
    )
}
