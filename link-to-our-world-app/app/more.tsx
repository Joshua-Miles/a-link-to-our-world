import { logout } from "api";
import {
  Column,
  ListItemLeadingIcon,
  ListItemTitle,
  PressableListItem,
} from "designer-m3";
import { LockIcon } from "designer-m3/icons";
import { useRouter } from "expo-router";
import { Nav } from "./Nav";

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
      </Column>
      <Nav />
    </>
  );
}
