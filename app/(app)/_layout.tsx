import DrawerContent from "@/src/components/_views/DrawerContent";
import { Drawer } from "expo-router/drawer";

export default function AppLayout() {
  return (
    <Drawer
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        headerShown: false, // Отключаем стандартный хедер (сделаем кастомную кнопку бургера на главной)
        drawerStyle: {
          backgroundColor: "#1C1C1E", // Цвет фона подтягиваем под дизайн
          width: "85%", // Drawer занимает 85% экрана
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Main",
        }}
      />
      <Drawer.Screen
        name="Account"
        options={{
          drawerLabel: "Account",
        }}
      />
    </Drawer>
  );
}
