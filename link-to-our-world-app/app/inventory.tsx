import { isLoading, useResult } from "@triframe/utils-react";
import { eat, listInventoryItems } from "api";
import { Button, Column, Label, Row, RowReverse, useDesignerTheme } from "designer-m3";
import { useState } from "react";
import { Image, ScrollView } from "react-native";
import { Assets, HealthMeter, InventoryItemSlug, ItemTile, Nav } from "shared";

export default function () {
    const items = useResult(listInventoryItems);

    const [ selectedItemSlug, setSelectedItemSlug ] = useState<InventoryItemSlug | null>(null)

    const { colors, spacing } = useDesignerTheme();

    if (isLoading(items)) return null;

    const questItems = items.filter(item => item.type === 'quest-item')
    const weapons = items.filter(item => item.type === 'weapon')
    const foods = items.filter(item => item.type === 'food')
    const ingredients = items.filter(item => item.type === 'ingredient')


    function toggleSelected(slug: InventoryItemSlug) {
        if (selectedItemSlug === slug) {
            setSelectedItemSlug(null)
        } else {
            setSelectedItemSlug(slug)
        }
    }

    async function handleEat() {
        const foodSlug = selectedItemSlug;
        if (!foodSlug) return;
        setSelectedItemSlug(null)
        await eat(foodSlug);
    }

    const selectedItem = items.find(item => item.slug === selectedItemSlug)

    return (
        <>
            <Column flex={1} px={4}>
                <HealthMeter />
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
                            <ItemTile key={item.id} item={item} isSelected={item.slug === selectedItemSlug} onPress={() => toggleSelected(item.slug)}/>
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
            {selectedItem && (
                <Row backgroundColor={colors.roles.surfaceContainerHighest} alignItems="center" px={spacing.sm}>
                    <Image source={Assets[selectedItem.imageSlug]}/>
                    <RowReverse flex={1} gap={spacing.xs}>
                        <Button.Filled onPress={handleEat}>
                            Eat
                        </Button.Filled>
                        <Button.Text onPress={() => setSelectedItemSlug(null)}>
                            Cancel
                        </Button.Text>
                    </RowReverse>
                </Row>
            )}
            <Nav />
        </>
    )
}
