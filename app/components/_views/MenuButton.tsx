import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import { useOpenMenu } from "../_viewsModels/MenuButtonViewModel";

export function MenuButton() {
  const openMenu = useOpenMenu();
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#424d57",
        height: normalize(30),
        width: normalize(30),
        borderRadius: normalize(10),
        marginLeft: normalize(15),
      }}
      onPress={openMenu}
    >
      <Ionicons name="menu" size={normalize(20)} color="#637483" />
    </TouchableOpacity>
  );
}
