import React, { useState } from "react";
import { Text, View } from "react-native";
import normalize from "react-native-normalize";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useBottomLogInMenuService } from "../_services/BottomLogInMenuService";
import { BottomWayMenuViewModel } from "../_viewsModels/BottomWayMenuViewModel";

export default function BottomLogInMenu() {
  const [email, setEmail] = useState("");
  const { keyBoardVisible } = BottomWayMenuViewModel();
  const { promptAsync } = useBottomLogInMenuService();

  
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        height: !keyBoardVisible ? 400 : 600,
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        zIndex: 2,
        backgroundColor: "#262E38",
      }}
    >
      <Text
        style={{
          color: "white",
          marginTop: normalize(15),
          fontSize: 35,
          fontFamily: "Roboto-Medium",
        }}
      >
        Welcome to CarX
      </Text>

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
          width: 350,
          height: 50,
          margin: 15,
          fontSize: 20,
          backgroundColor: "#424d57",
        }}
        onChangeText={(email) => setEmail(email)}
      />

    
        <>
          <Button
            style={{
              backgroundColor: "yellow",
              width: 350,
              height: 50,
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
          >
            Log In
          </Button>

          <Text
            style={{
              width: 350,
              textAlign: "center",
              fontSize: 30,
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
              width: 340,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              icon="apple"
              size={40}
              iconColor="white"
              style={{ backgroundColor: "#424d57", borderRadius: 10 }}
              onPress={() => console.log("Pressed")}
            />
            <IconButton
              icon="google"
              size={40}
              iconColor="white"
              style={{ backgroundColor: "#424d57", borderRadius: 10 }}
              onPress={() => promptAsync()}
            />
            <IconButton
              icon="account-key"
              size={40}
              iconColor="white"
              style={{ backgroundColor: "#424d57", borderRadius: 10 }}
              onPress={() => console.log("Pressed")}
            />
            <IconButton
              icon="email"
              size={40}
              iconColor="white"
              style={{ backgroundColor: "#424d57", borderRadius: 10 }}
              onPress={() => console.log("Pressed")}
            />
          </View>
        </>

    </View>
  );
}
