import Color from "color";
import { Column, RowReverse, Theme, timing } from "designer-m3";

export const HitScrim = RowReverse
    .withInteractionState('_hit')
    .deriveInteractionStateFromProps((props: { showHit: boolean }) => ({ _hit: props.showHit }))
    .style((theme: Theme) => ({
        opacity: 1,
        backgroundColor: theme.colors.roles.surface,
        _hit: {
            backgroundColor: new Color(theme.colors.roles.error).alpha(0.5).hex()
        },
        transitions: {
            backgroundColor: timing(500)
        }
    }))
