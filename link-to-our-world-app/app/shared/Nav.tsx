import {
  DesignerM3Provider,
  NavigationBar,
  NavigationIcon,
  NavigationItem,
  NavigationLabel,
  theme,
} from "designer-m3";
import { BarsIcon, MapIcon } from "designer-m3/icons";
import { usePathname } from "expo-router";

export function Nav() {
  const pathName = usePathname();
  return (
    <NavigationBar>
      <NavigationItem active={pathName.startsWith('/map')} href="/map">
        <NavigationIcon>
          <MapIcon />
        </NavigationIcon>
        <NavigationLabel>Map</NavigationLabel>
      </NavigationItem>
      <NavigationItem active={pathName.startsWith('/more')} href="/more">
        <NavigationIcon>
          <BarsIcon />
        </NavigationIcon>
        <NavigationLabel>More</NavigationLabel>
      </NavigationItem>
    </NavigationBar>
  );
}
