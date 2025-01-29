import { InteractionState, StyledComponent, StyleProps } from "ui-core/createStyledComponent/createStyledComponent";
import { InteractionStateIdentifier } from "ui-core/createStyledComponent/StyledComponentInterface";

export function createComponentWithVariants<P, R, V extends string, S extends InteractionState>(
    Parent: StyledComponent<P, R ,S>,
    variantStyles: Record<V, (theme: any) => StyleProps<S>>
) {
    const Base = Parent.shard();

    const Variants = {
        is(interactionState: S) {
            return Base.is(interactionState);
        }
    } as Record<Capitalize<V>, StyledComponent<P, R, S>> & {
        is(interactionState: S): InteractionStateIdentifier
    }

    for (let variant in variantStyles) {
        const variantName = variant[0].toUpperCase() + variant.substring(1);
        Variants[variantName] = Base.style(variantStyles[variant]);
    }

    return Variants;
}
