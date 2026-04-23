import { DrawerParamList } from "@/src/types/DrawerParamTypes";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { GestureResponderEvent } from "react-native";

export function useOpenMenu() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const openMenu = (_event?: GestureResponderEvent) => {
    navigation.toggleDrawer();
  };
  return openMenu;
}
