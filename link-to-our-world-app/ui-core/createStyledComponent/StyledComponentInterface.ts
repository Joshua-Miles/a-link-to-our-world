import type { CreateStyledComponent, CreateStyledComponentCallback, CreateStyledComponentOptions, InteractionState, InteractionStateIdentifierRecord, StyleCreator, StyledComponent } from "./createStyledComponent";

export type StyledComponentExternalInterface<P, R, S extends InteractionState> = {
    style: <Theme>(styleCreator: StyleCreator<S, Theme>) => StyledComponent<P, R, S>
    withInteractionState: <S2 extends InteractionState>(...interactionState: S2[]) => StyledComponent<P, R, S | S2>
    inheritInteractionState: <S2 extends InteractionState>(identifier: InteractionStateIdentifier, alias: S2) => StyledComponent<P, R, S | S2>
    deriveInteractionStateFromProps: <NP>(callback: (props: NP) => Partial<Record<S, boolean>>) => StyledComponent<NP & P, R, S>
    shard: () => StyledComponent<P, R, S>
    is: (interactionState: S) => InteractionStateIdentifier
}

export const createStyledComponentInterface = <P, R, S extends InteractionState>(callback: CreateStyledComponentCallback<P, R, S>, options: CreateStyledComponentOptions<P,S>, createStyledComponent: CreateStyledComponent): StyledComponentExternalInterface<P, R, S> => ({
    style<Theme>(styleCreator: StyleCreator<S, Theme>) {
        return createStyledComponent(callback, {
            ...options,
            interactionStates: moreSpecificInteractionStates(options.interactionStates),
            styleCreators: [
                ...options.styleCreators,
                styleCreator
            ]
        });
    },

    withInteractionState<S2 extends InteractionState>(...interactionStates: S2[]) {
        const newInteractionStates = {} as Record<S2, InteractionStateIdentifier>;
        for (let interactionState of interactionStates) {
            newInteractionStates[interactionState] = new InteractionStateIdentifier(interactionState);
        }

        const newOptions = {
            ...options,
            interactionStates: {
                ...moreSpecificInteractionStates(options.interactionStates),
                ...newInteractionStates
            }
        } as CreateStyledComponentOptions<P, S | S2>

        return createStyledComponent<P, R, S | S2>(callback as CreateStyledComponentCallback<P, R, S | S2>, newOptions);
    },

    inheritInteractionState<S2 extends InteractionState>(interactionStateIdentifier: InteractionStateIdentifier, interactionStateAlias: S2) {
        const newOptions = {
            ...options,
            interactionStates: moreSpecificInteractionStates(options.interactionStates),
            inheritedInteractionStates: {
                ...options.inheritedInteractionStates,
                [interactionStateAlias]: interactionStateIdentifier
            }
        } as CreateStyledComponentOptions<P, S | S2>

        return createStyledComponent<P, R, S | S2>(callback as CreateStyledComponentCallback<P, R, S | S2>, newOptions);
    },

    deriveInteractionStateFromProps<NP>(deriveInteractionStateFromProps: (props: NP) => Partial<Record<S, boolean>>) {
        return createStyledComponent<P & NP, R, S>(callback, {
            ...options,
            deriveInteractionStateFromProps
        })
    },

    shard() {
        const newOptions = {
            ...options,
            interactionStates: moreSpecificInteractionStates(options.interactionStates),
        } as CreateStyledComponentOptions<P, S>

        return createStyledComponent<P, R, S>(callback, newOptions);
    },

    is(interactionState: S) {
        return options.interactionStates[interactionState] ?? options.inheritedInteractionStates[interactionState];
    }

})

function moreSpecificInteractionStates<S extends InteractionState>(interactionStates: InteractionStateIdentifierRecord<S>) {
    const moreSpecificInteractionStates = {} as Record<S, InteractionStateIdentifier>
    for (let interactionState in interactionStates) {
        moreSpecificInteractionStates[interactionState] = interactionStates[interactionState].incrementSpecificity();
    }
    return moreSpecificInteractionStates
}


let interactionStateIdentifierSerial = 1;

export class InteractionStateIdentifier {

    private readonly label: string;

    private readonly id: number;

    private readonly specificity: number;

    constructor(label: string, id: number = interactionStateIdentifierSerial++, specificity: number = 0) {
        this.label = label;
        this.id = id;
        this.specificity = specificity;
    }

    incrementSpecificity() {
        return new InteractionStateIdentifier(this.label, this.id, this.specificity + 1);
    }

    extends(otherInteractionStateIdentifier: InteractionStateIdentifier) {
        return this.id === otherInteractionStateIdentifier.id && this.specificity >= otherInteractionStateIdentifier.specificity;
    }

}