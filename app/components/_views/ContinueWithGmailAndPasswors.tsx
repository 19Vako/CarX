import React, { useState } from "react";
import { Animated } from 'react-native';
import { Button, IconButton, TextInput } from "react-native-paper";
import { ContinueWithGmailAndPassworsModel } from "../_viewsModels/ContinueWithGmailAndPassworsModel";


export default function ContinueWithGmailAndPasswors({handleView} : {handleView: (View: "Gmail_Password_View" | "Welcome_View") => void}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {heightAnimation, positionButton} = ContinueWithGmailAndPassworsModel();

  
    return (
     <>
      <IconButton
          icon="arrow-left"
          size={30}
          iconColor="white"
          style={{backgroundColor: "#424d57", borderRadius: 10, position: "absolute", top: 50, left: 15, zIndex: 3}}
          onPress={() => handleView("Welcome_View")}
        />
      <Animated.View
        style={{
        position: "absolute",
        bottom: 0,
        height: heightAnimation,
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        zIndex: 2,
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
              marginTop:positionButton,
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
      </Animated.View>
     </>
  )
}


