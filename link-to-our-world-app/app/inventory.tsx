import { isLoading, useResult } from "@triframe/utils-react";
import { listInventoryItems } from "api";
import { Column, Label, Row, useDesignerTheme } from "designer-m3";
import { Image, ScrollView } from "react-native";
import { Assets, Nav } from "shared";

export default function () {
    const items = useResult(listInventoryItems);

    if (isLoading(items)) return null;

    const questItems = items.filter(item => item.type === 'quest-item')
    const weapons = items.filter(item => item.type === 'weapon')
    const foods = items.filter(item => item.type === 'food')
    const ingredients = items.filter(item => item.type === 'ingredient')

    return (
        <>
            <Column flex={1} px={4}>
                <ScrollView contentContainerStyle={{ gap: 8 }}>
                    {questItems.length > 0 && <Label.Medium>Quest Items</Label.Medium>}
                    <Row flexWrap="wrap">
                        {questItems.map(item => (
                            <ItemTile key={item.id} item={item} />
                        ))}
                    </Row>
                    {weapons.length > 0 && <Label.Medium>Weapons</Label.Medium>}
                    <Row flexWrap="wrap">
                        {weapons.map(item => (
                            <ItemTile key={item.id} item={item} />
                        ))}
                    </Row>
                    {foods.length > 0 && <Label.Medium>Food</Label.Medium>}
                    <Row flexWrap="wrap">
                        {foods.map(item => (
                            <ItemTile key={item.id} item={item} />
                        ))}
                    </Row>
                    {ingredients.length > 0 && <Label.Medium>Ingredients</Label.Medium>}
                    <Row flexWrap="wrap">
                        {ingredients.map(item => (
                            <ItemTile key={item.id} item={item} />
                        ))}
                    </Row>
                </ScrollView>
            </Column>
            <Nav />
        </>
    )
}

type ItemTileProps = {
    item: {
        slug: string
        imageSlug: string
        name: string
        quantity: number
    }
}

function ItemTile({ item }: ItemTileProps) {
    const { colors } = useDesignerTheme();
    return (
        <Column width="25%" key={item.slug} position="relative">
            <Image
                style={{ width: 100, height: 100, objectFit: 'cover' }}
                source={Assets[item.imageSlug]}
            />
            <Label.Small textAlign="center">{item.name}</Label.Small>
            {item.quantity > 1 && (
                <Label.Small
                    textAlign="center"
                    position="absolute"
                    top={75}
                    width={25}
                    left={75}
                    backgroundColor={colors.roles.surfaceContainerHighest}
                    color={colors.roles.onSurface}
                >
                    {item.quantity}
                </Label.Small>
            )}
        </Column>
    )
}
