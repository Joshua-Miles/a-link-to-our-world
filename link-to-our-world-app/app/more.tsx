import { logout, resetGame } from "api";
import {
  Column,
  ListItemLeadingIcon,
  ListItemTitle,
  PressableListItem,
} from "designer-m3";
import { BackwardIcon, LockIcon } from "designer-m3/icons";
import { useRouter } from "expo-router";
import { Nav } from "shared";

export default function More() {
  const router = useRouter();

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
        {__DEV__ && (
          <PressableListItem onPress={resetGame}>
            <ListItemLeadingIcon>
              <BackwardIcon />
            </ListItemLeadingIcon>
            <ListItemTitle>Reset</ListItemTitle>
          </PressableListItem>
        )}
         {__DEV__ && (
          <PressableListItem href="/scrathpad">
            <ListItemLeadingIcon>
              <BackwardIcon />
            </ListItemLeadingIcon>
            <ListItemTitle>Scratch Paad</ListItemTitle>
          </PressableListItem>
        )}
      </Column>
      <Nav />
    </>
  );
}
