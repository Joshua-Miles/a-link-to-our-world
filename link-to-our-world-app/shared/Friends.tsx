import { Column } from "designer-m3"
import { Image } from "react-native"
import { Assets } from "./Assets"

export function Friends() {
    return (
        <Column height="50%" top="10%" width="100%" position="relative">
            <SceneImage width="50%" height="50%" top="-4%" left="10%" asset="thurnok" />
            <SceneImage width="55%" height="55%" top="-8%" left="40%" asset="darvok" />
            <SceneImage width="25%" height="40%" top="4%" left="4%" asset="tidebane" />
            <SceneImage width="45%" height="40%" top="10%" left="4%" asset="ravia" />
            <SceneImage width="25%" height="40%" top="4%" left="70%" asset="kyllis" />
            <SceneImage width="30%" height="30%" top="20%" left="58%" asset="tavon" />
            <SceneImage width="35%" height="35%" top="15%" left="30%" asset="sorai" />
            <SceneImage width="12%" height="12%" top="0%" left="1%" asset="nimri" />
        </Column>
    )
}

function SceneImage({ asset, width, ...props }: Parameters<typeof Column>[0] & { asset: string }) {
    return <Column position="absolute" width={width} {...props}>
        <Image source={Assets[asset]} style={{ width: '100%', height: '100%', objectFit: 'contain'}} />
    </Column>
}