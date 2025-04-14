import { isLoading, useResult } from "@triframe/utils-react";
import { listInventoryItems, listMemories } from "api";
import { Column, Label, Row } from "designer-m3";
import { Image } from "react-native";
import { Assets, Nav } from "./shared";

export default function () {
    const items = useResult(listInventoryItems);
    return (
        <>
            <Row flex={1} flexWrap="wrap">
                {!isLoading(items) && items.map( item => (
                    <Column width="25%" key={item.slug}>
                        <Image
                            style={{ width: 100, height: 100, objectFit: 'cover' }}
                            source={Assets[item.imageSlug]}
                        />
                        <Label.Small>{item.name}</Label.Small>
                    </Column>
                ))}
            </Row>
            <Nav />
        </>
    )
}