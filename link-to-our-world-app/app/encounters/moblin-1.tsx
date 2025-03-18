import { MemoryMaker } from "app/shared"
import { Column } from "designer-m3"

export default () => {
    return (
        <Column flex={1}>

            {/* <Dialog
                flex={1}
                tree={dialog('Hey!', {
                    'What': dialog('Lets fight', {
                        'No thank you': dialog('P l e a s e?'),
                        'Fine': dialog('Lets GOOOOOO')
                    }),
                    'How': dialog('Lets fight'),
                    'When': dialog('Lets fight'),
                })}
            /> */}
            {/* <Combat fortitude={50} asset="moblin" /> */}
            <MemoryMaker />
        </Column>
    )
}
