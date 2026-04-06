import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import { useOpenMenu } from "../_viewsModels/MenuButtonViewModel";

export default function MenuButton() {
  const openMenu = useOpenMenu();
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#262E38",
        height: normalize(30),
        width: normalize(30),
        borderRadius: normalize(10),
        marginTop: normalize(20),
        marginLeft: normalize(15),
      }}
      onPress={openMenu}
    >
      <Ionicons name="menu" size={normalize(20)} color="white" />
    </TouchableOpacity>
  );
}
