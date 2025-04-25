import { logout, resetGame } from "api";
import {
  Column,
  IconButton,
  ListItem,
  ListItemLeadingIcon,
  ListItemTitle,
  PressableListItem,
  RadioButton,
  RadioButtonLabel,
  RadioGroup,
} from "designer-m3";
import { BackwardIcon, CheckIcon, LockIcon, XIcon } from "designer-m3/icons";
import { useRouter } from "expo-router";
import { Nav, usePersistedState } from "shared";

export default function More() {
  const router = useRouter();

  const [ isClickNavigationEnabled, setIsClickNavigationEnabled ] = usePersistedState<boolean>('isClickNavigationEnabled', false);

  async function handleLogout() {
    await logout();
    router.push(`/splash`);
  }

  return (
    <>
      <Column flex={1}>
        <PressableListItem onPress={handleLogout}>
          <ListItemLeadingIcon>
            <LockIcon />
          </ListItemLeadingIcon>
          <ListItemTitle>Logout</ListItemTitle>
        </PressableListItem>
        <PressableListItem onPress={() => setIsClickNavigationEnabled(!isClickNavigationEnabled)}>
          <ListItemLeadingIcon>
              {isClickNavigationEnabled ? <CheckIcon /> : <XIcon />}
          </ListItemLeadingIcon>
          <ListItemTitle>
            Use Click Navigation
          </ListItemTitle>
         
          {/* <RadioGroup value={isClickNavigationEnabled} onChange={setIsClickNavigationEnabled}>
            <RadioButtonLabel value={true}>
              Yes
            </RadioButtonLabel>
            <RadioButton value={true} />
            <RadioButtonLabel value={false}>
              No
            </RadioButtonLabel>
            <RadioButton value={false} />
          </RadioGroup> */}
        </PressableListItem>
      </Column>
      <Nav />
    </>
  );
}
