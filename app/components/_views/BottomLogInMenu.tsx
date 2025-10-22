import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";

import { RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function BottomLogInMenu() {
  const [email, setEmail] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        position:"absolute",
        bottom:0,
        height: 300,
        width: "100%",
        display: "flex",
        alignItems: "center",
        zIndex:2,
        backgroundColor: "#262E38",
      }}
    >
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        textColor="white"
        activeOutlineColor="white"
        theme={{
          colors: {
            onSurfaceVariant: "white",
          },
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
        autoComplete="email"
        style={{
          width: "90%",
          height: 50,
          margin: 10,
          fontSize: 20,
          backgroundColor: "#424d57",
        }}
        onChangeText={(email) => setEmail(email)}
      />
      <Button
        style={{
          backgroundColor: "yellow",
          width: "90%",
          borderRadius: 5,
          margin: 10,
          borderColor: "white",
        }}
        contentStyle={{
          height: 50,
          backgroundColor: "yellow",
        }}
        icon="login"
        mode="outlined"
        textColor="#424d57"
        onPress={() => console.log("Pressed")}
      >
        Log in
      </Button>

      <Text
        style={{
          width: "90%",
          textAlign: "center",
          fontSize: 20,
          color: "#424d57",
          borderWidth: 1,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: "gray",
        }}
      >
        or
      </Text>

      <View
        style={{
          marginTop: 10,
          width: "93%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          icon="apple"
          size={45}
          iconColor="white"
          style={{ backgroundColor: "#424d57", borderRadius: 10 }}
          onPress={() => console.log("Pressed")}
        />
        <IconButton
          icon="google"
          size={45}
          iconColor="white"
          style={{ backgroundColor: "#424d57", borderRadius: 10 }}
          onPress={() => console.log("Pressed")}
        />
        <IconButton
          icon="account-key"
          size={45}
          iconColor="white"
          style={{ backgroundColor: "#424d57", borderRadius: 10 }}
          onPress={() => console.log("Pressed")}
        />
        <IconButton
          icon="email"
          size={45}
          iconColor="white"
          style={{ backgroundColor: "#424d57", borderRadius: 10 }}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </View>
  );
}
