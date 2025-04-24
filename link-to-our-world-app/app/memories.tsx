import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, getTemplesWatered, listMemories } from "api";
import { Column, Label, Row } from "designer-m3";
import { Image, useWindowDimensions } from "react-native";
import { Nav } from "shared";

export default function () {
    const memories = useResult(listMemories);
    const screen = useWindowDimensions();

    const templesWatered = useResult(getTemplesWatered);
    
    const finaleSongs = useResult(getEncounter, 'finale/songs')

    if (isLoading(memories) || isLoading(templesWatered) || isLoading(finaleSongs) || isAnyFailure(templesWatered) || isAnyFailure(finaleSongs)) {
        return null
    }

    if ((memories.length === 0) || (templesWatered.totalComplete === 4 && !finaleSongs.resolved)) return (
        <>
            <Column justifyContent="center" alignItems="center" flex={1}>
                <Label.Large>No memories to display</Label.Large>
            </Column>
            <Nav />
        </>
    )

    const labels = {
        'planting-tumblebreeze': 'Planting Tumblebreeze',
        'planting-grinroot': 'Planting Grinroot',
        'planting-scribeleaf': 'Planting Scribeleaf',
        'planting-fayflutter': 'Planting Fayflutter'
    }

    return (
        <>
            <Column justifyContent="center" flex={1}>
                <Row flexWrap="wrap">
                    {!isLoading(memories) && memories.map( memory => (
                        <Column width="50%" key={memory.slug}>
                            <Image
                                style={{ width: screen.width / 2, height: screen.width / 2, objectFit: 'cover' }}
                                source={{ uri: memory.imageUrl.toString() }}
                            />
                            <Label.Small textAlign="center">{labels[memory.slug]}</Label.Small>
                        </Column>
                    ))}
                </Row>
            </Column>
            <Nav />
        </>
    )
}