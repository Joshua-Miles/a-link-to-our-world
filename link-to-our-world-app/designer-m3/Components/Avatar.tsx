import { StyledView } from "ui-core";
import { Image, ImageProps } from 'react-native';
import { Theme } from "../Theme";

const AVATAR_HEIGHT = 40;

export type AvatarProps = Parameters<typeof StyledView>[0] & {
    source: ImageProps['source']
}

export function Avatar({ source, ...props }: AvatarProps) {
    return (
        <AvatarContainer {...props}>
            <Image source={source} style={{ width: AVATAR_HEIGHT, height: AVATAR_HEIGHT }} />
        </AvatarContainer>
    )
}

const AvatarContainer = StyledView.style((theme: Theme) => ({
    width: AVATAR_HEIGHT,
    height: AVATAR_HEIGHT,
    borderRadius: AVATAR_HEIGHT/2,
    overflow: 'hidden'
}))