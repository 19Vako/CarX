import React, { useState } from "react";
import { View } from 'react-native';
import { Button, TextInput } from "react-native-paper";

const ContinueWithGmailAndPasswors = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    return (
      <View>
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
        onChangeText={setEmail}
        />

        <TextInput
        label="Password"
        mode="outlined"
        value={password}
        textColor="white"
        activeOutlineColor="white"
        theme={{
          colors: {
            onSurfaceVariant: "white",
          },
        }}
        autoCapitalize="none"
        textContentType="emailAddress"
        autoComplete="password"
        style={{
          width: 350,
          height: 50,
          margin: 15,
          fontSize: 20,
          backgroundColor: "#424d57",
        }}
        onChangeText={setPassword}
        />
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
      </View>
  )
}

export default ContinueWithGmailAndPasswors

