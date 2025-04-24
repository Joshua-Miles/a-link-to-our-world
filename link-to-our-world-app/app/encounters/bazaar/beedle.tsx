import { ExcludeFailures, isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { cook, getPlayerMeters, listInventoryItems } from "api";
import { Button, Column, Label, Row, useDesignerTheme } from "designer-m3";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView } from "react-native";
import { Assets, dialog, Dialog, InventoryItemSlug, ItemGet, ItemTile, RupeeMeter, Scene, SceneFocus, Speech, useSequence } from "shared";

type CookingMethod = 'pan' | 'oven' | 'pot'

type Food = ExcludeFailures<Awaited<ReturnType<typeof cook>>>

export default function () {
    const [method, setMethod] = useState<CookingMethod | null>(null)
    const [result, setResult] = useState<Food | null>(null)
    const [ selectedIngredients, setSelectedIngredients ] = useState<InventoryItemSlug[]>([]);
    const playerMeter = useResult(getPlayerMeters);

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'dialog',
        'ingredientSelect',
        'showResult'
    ])

    const items = useResult(listInventoryItems)

    if (isLoading(items) || isLoading(playerMeter) || isAnyFailure(playerMeter)) return null;

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
        setSelectedIngredients([]);
        setResult(result)
        sequence.next()
    }

    const canCook = ingredients.length >= 3 && playerMeter.rupees >= 10;

    return (
        <Scene px={0}>
            <RupeeMeter />
            <SceneFocus asset="beedle" />
            <Dialog
                hasStarted={sequence.hasReached('dialog')}
                tree={dialog('How can I help?', {
                    'What do you do here?': dialog('I cook things.'),
                    "I'd like to cook some food": 
                        canCook ? dialog('What would you like to cook it with?', {
                            'A pan': dialog('Sounds great!'),
                            'An oven': dialog('Sounds great!'),
                            'A pot': dialog('Sounds great!')
                        })
                        : dialog(ingredients.length < 3 
                            ? `You don't have enough ingredients to cook. Come back when you have at least 3 ingredients` 
                            : `You don't have enough rupees to cook. Come back when you have at least 10 rupees` ),
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
                    const method = lastSelection === 'A pan' ? 'pan'
                        : lastSelection === 'An oven' ? 'oven'
                            : 'pot';

                    setMethod(method)
                    sequence.next()
                }}
            />
            {sequence.isAt('ingredientSelect') && (
                <>
                    <Speech text={`What would you like to cook with a ${method}?`} />
                    <ScrollView style={{ flex: 1, marginHorizontal: 0, padding: 0 }} contentContainerStyle={{ padding: 0, margin: 0 }}>
                        <Row flexWrap="wrap" mt={16} width="100%">
                            {ingredients.map(ingredient => (
                                <ItemTile 
                                    key={ingredient.slug}
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
                description={
                    result.type === 'food' ? 
                        (result.power !== null && result.power > 0) ? `Eat this to replenish ${result.power} hearts` 
                        : `Eating this will not replenish any health`
                    : 'Use this to cook extra tasty dishes'
                 }
                asset={result.imageSlug}
                onFinished={sequence.next}
            />}
        </Scene>
    )
}
