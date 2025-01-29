import { StyledText, StyledView } from "ui-core";
import { ScrollView } from "react-native";
import { useTheme } from "ui-core/Theme";
import { Theme } from "designer-m3";

export function ColorDocs() {
  const theme = useTheme<Theme>();

  const colorRoles = Object.keys(theme.colors.roles);

  return (
    <ScrollView>
      <StyledView flexDirection="row">
        <StyledView>
          {colorRoles.map((role) => (
            <StyledView flexDirection="row" height={50} alignItems="center">
              <StyledText>{role}</StyledText>
            </StyledView>
          ))}
        </StyledView>
        <StyledView flex={1}>
          {colorRoles.map((role) => (
            <StyledView
                height={50}
                backgroundColor={theme.colors.roles[role]}
            />
          ))}
        </StyledView>
      </StyledView>
    </ScrollView>
  );
}
