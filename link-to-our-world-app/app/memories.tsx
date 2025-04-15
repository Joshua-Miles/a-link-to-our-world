import { isLoading, useResult } from "@triframe/utils-react";
import { listMemories } from "api";
import { Column, Label, Row } from "designer-m3";
import { Image } from "react-native";
import { Nav } from "shared";

export default function () {
    const memories = useResult(listMemories);
    return (
        <>
            <Row flex={1} flexWrap="wrap">
                {!isLoading(memories) && memories.map( memory => (
                    <Column width="25%" key={memory.slug}>
                        <Image
                            style={{ width: 100, height: 100, objectFit: 'cover' }}
                            source={{ uri: memory.imageUrl.toString() }}
                        />
                        <Label.Small>{memory.slug}</Label.Small>
                    </Column>
                ))}
            </Row>
            <Nav />
        </>
    )
}