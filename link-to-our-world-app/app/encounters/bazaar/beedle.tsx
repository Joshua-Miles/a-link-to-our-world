import { ExcludeFailures, isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { cook, listInventoryItems } from "api";
import { Button, Column, Label, Row, useDesignerTheme } from "designer-m3";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView } from "react-native";
import { Assets, dialog, Dialog, InventoryItemSlug, ItemGet, Scene, SceneFocus, Speech, useSequence } from "shared";

type CookingMethod = 'stove' | 'oven' | 'pot'

type Food = ExcludeFailures<Awaited<ReturnType<typeof cook>>>

export default function () {
    const [method, setMethod] = useState<CookingMethod | null>(null)
    const [result, setResult] = useState<Food | null>(null)
    const [ selectedIngredients, setSelectedIngredients ] = useState<InventoryItemSlug[]>([]);

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'dialog',
        'ingredientSelect',
        'showResult'
    ])

    const items = useResult(listInventoryItems)

    if (isLoading(items)) return null;

    const ingredients = items.filter(item => item.type === 'ingredient')

    function handleFinished() {
        sequence.restart();
    }

    function toggleSelected(slug: InventoryItemSlug) {
        if (selectedIngredients.includes(slug)) {
            setSelectedIngredients(selectedIngredients => selectedIngredients.filter( ingredient => ingredient !== slug))
        } else {
            setSelectedIngredients([ ...selectedIngredients, slug ])
        }
    }

    async function handleCook() {
        if (method === null) return;
        const result = await cook(method, selectedIngredients);
        if (isAnyFailure(result)) return;
        setResult(result)
        sequence.next()
    }

    const canCook = ingredients.length >= 3;



    return (
        <Scene>
            <SceneFocus asset="beedle" />
            <Dialog
                hasStarted={sequence.hasReached('dialog')}
                tree={dialog('How can I help?', {
                    'What do you do here?': dialog('I cook things.'),
                    "I'd like to cook some food": 
                        canCook ? dialog('What would you like to cook it with?', {
                            'A stove': dialog('Sounds great!'),
                            'An oven': dialog('Sounds great!'),
                            'A pot': dialog('Sounds great!')
                        })
                        : dialog(`You don't have enough ingredients to cook. Come back when you have at least 3 ingredients`),
                    'Bye!': dialog('See you around!')
                })}
                onFinished={(selections) => {
                    const lastSelection = selections.pop();
                    if (lastSelection === 'Bye!' || lastSelection === `I'd like to cook some food`) {
                        return router.push('/map')
                    }
                    if (lastSelection === 'What do you do here?') {
                        return sequence.restart()
                    }
                    const method = lastSelection === 'A stove' ? 'stove'
                        : lastSelection === 'An oven' ? 'oven'
                            : 'pot';

                    setMethod(method)
                    sequence.next()
                }}
            />
            {sequence.isAt('ingredientSelect') && (
                <>
                    <Speech text={`What would you like to cook with a ${method}?`} />
                    <ScrollView contentContainerStyle={{ flex: 1 }}>
                        <Row flexWrap="wrap" mt={16} gap={8}>
                            {ingredients.map(ingredient => (
                                <ItemTile 
                                    item={ingredient} 
                                    isSelected={selectedIngredients.includes(ingredient.slug)} 
                                    onPress={() => toggleSelected(ingredient.slug)}
                                />
                            ))}
                        </Row>
                    </ScrollView>
                    <Button.Filled disabled={selectedIngredients.length !== 3} onPress={handleCook}>
                        Cook!
                    </Button.Filled>
                </>
            )}
           {result !== null &&
            <ItemGet
                isOpen={sequence.isAt('showResult')}
                title={result.name}
                description=""
                asset={result.imageSlug}
                onFinished={sequence.next}
            />}
        </Scene>
    )
}

type ItemTileProps = {
    isSelected: boolean
    onPress: () => any
    item: {
        slug: string
        imageSlug: string
        name: string
        quantity: number
    }
}

function ItemTile({ item, isSelected, onPress }: ItemTileProps) {
    const { colors, spacing } = useDesignerTheme();
    return (
        <Column width="25%" key={item.slug} position="relative" onPress={onPress} borderColor={colors.roles.primary} borderWidth={isSelected ? spacing.lines.sm : 0}>
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
