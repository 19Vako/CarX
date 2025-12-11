import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { GestureResponderEvent } from "react-native";
import { DrawerParamList } from "../_models/MenuButtonModel";

export function useOpenMenu() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const openMenu = (_event?: GestureResponderEvent) => {
    navigation.toggleDrawer();
  };
  return openMenu;
}
