import { Display, Headline, Title, Body, Label } from "../Components/Typography";
import { StyledView } from "ui-core";

export function TypographyDocs() {
    return (
        <StyledView justifyContent="space-evenly" alignItems="center" height="100%">
            <Display.Large>Dis. Large</Display.Large>
            <Display.Medium>Dis. Medium</Display.Medium>
            <Display.Small>Display Small</Display.Small>

            <Headline.Large>Headline Large</Headline.Large>
            <Headline.Medium>Headline Medium</Headline.Medium>
            <Headline.Small>Headline Small</Headline.Small>

            <Title.Large>Title Large</Title.Large>
            <Title.Medium>Title Medium</Title.Medium>
            <Title.Small>Title Small</Title.Small>

            <Body.Large>Body Large</Body.Large>
            <Body.Medium>Body Medium</Body.Medium>
            <Body.Small>Body Small</Body.Small>

            <Label.Large>Label Large</Label.Large>
            <Label.Medium>Label Medium</Label.Medium>
            <Label.Small>Label Small</Label.Small>
        </StyledView>
    )
}