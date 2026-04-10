import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export function DrawerButtonViewModel() {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return {
    openDrawer,
  };
}
