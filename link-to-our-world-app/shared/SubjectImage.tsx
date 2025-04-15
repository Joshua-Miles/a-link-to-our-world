import { Image, ImageProps } from "react-native";

export function SubjectImage(props: ImageProps) {
    return <Image {...props} style={{ width: 200, height: 200, objectFit: 'contain' }} />
}
