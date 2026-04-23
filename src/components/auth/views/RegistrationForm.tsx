import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <TextInput
        style={{ width: 300, margin: 10, backgroundColor: "#424d57" }}
        label="Email"
        mode="outlined"
        value={email}
        textColor="#fff"
        activeOutlineColor="silver"
        selectionColor="white"
        placeholderTextColor="#bbb"
        theme={{
          colors: {
            onSurfaceVariant: "#bbbbbb",
          },
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
        autoComplete="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={{ width: 300, margin: 10, backgroundColor: "#424d57" }}
        label="Password"
        mode="outlined"
        value={password}
        textColor="#fff"
        activeOutlineColor="silver"
        selectionColor="white"
        placeholderTextColor="#bbb"
        theme={{
          colors: {
            onSurfaceVariant: "#bbbbbb",
          },
        }}
        secureTextEntry={true}
        textContentType="password"
        autoComplete="password"
        onChangeText={(email) => setPassword(email)}
      />

      <Button
        style={{
          backgroundColor: "yellow",
          borderRadius: 5,
          margin: 10,
          width: 300,
        }}
        icon="login"
        mode="outlined"
        textColor="#424d57"
        onPress={() => console.log("Pressed")}
      >
        Log in
      </Button>
    </View>
  );
}
