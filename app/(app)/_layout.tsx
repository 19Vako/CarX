import DrawerContent from "@/src/components/_views/DrawerContent";
import { Drawer } from "expo-router/drawer";

export default function AppLayout() {
  return (
    <Drawer
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#1C1C1E",
          width: "85%",
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
      <Drawer.Screen
        name="History"
        options={{
          drawerLabel: "History",
        }}
      />
      <Drawer.Screen
        name="Payment"
        options={{
          drawerLabel: "Payment",
        }}
      />
    </Drawer>
  );
}
