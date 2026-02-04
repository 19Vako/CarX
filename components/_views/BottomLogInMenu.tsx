import React from "react";
import { Animated, Text, View } from "react-native";
import normalize from "react-native-normalize";
import { Button, IconButton, TextInput } from "react-native-paper";
import { BottomLogInMenuViewModel } from "../_viewsModels/BottomLogInMenuViewModel";
import ConfirmNumberCode from "./ConfirmNumberCode";
import CountryCodeSelect from "./CountryCodeSelect";

export default function BottomLogInMenu({
  handleView,
}: {
  handleView: (View: "Gmail_Password_View" | "Welcome_View") => void;
}) {
  const {
    heightAnimation,
    handleContinueWithGoogle,
    ContinueWithApple,
    handleContinueWithFacebook,
    handleSendCode_,
    phone,
    setPhone,
    isVisible,
    countryTextCode,
    countryCode,
    setCountryTextCode,
    setCountryCode,
  } = BottomLogInMenuViewModel();

  return (
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

      <View
        style={{
          height: 50,
          width: 350,
          marginTop: 10,
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <CountryCodeSelect
          countryTextCode={countryTextCode}
          setCountryTextCode={setCountryTextCode}
          setCountryCode={setCountryCode}
          countryCode={countryCode}
        />
        <TextInput
          label="Phone number"
          mode="outlined"
          value={phone}
          textColor="white"
          activeOutlineColor="white"
          outlineColor="gray"
          theme={{
            colors: {
              onSurfaceVariant: "white",
            },
          }}
          outlineStyle={{
            borderWidth: 0.3,
          }}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoComplete="tel"
          autoCapitalize="none"
          style={{
            width: 250,
            height: 50,
            fontSize: 20,
            backgroundColor: "#424d57",
          }}
          onChangeText={setPhone}
        />
      </View>

      <>
        <ConfirmNumberCode isVisible={isVisible} />
        <Button
          style={{
            backgroundColor: "yellow",
            width: 350,
            height: 50,
            borderRadius: 5,
            margin: 10,
            borderWidth: 0.3,
            borderColor: "gray",
          }}
          contentStyle={{
            height: 50,
            backgroundColor: "yellow",
          }}
          icon="login"
          mode="outlined"
          textColor="#424d57"
          onPress={handleSendCode_}
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
            onPress={ContinueWithApple}
          />
          <IconButton
            icon="google"
            size={40}
            iconColor="white"
            style={{ backgroundColor: "#424d57", borderRadius: 10 }}
            onPress={handleContinueWithGoogle}
          />
          <IconButton
            icon="facebook"
            size={40}
            iconColor="white"
            style={{ backgroundColor: "#424d57", borderRadius: 10 }}
            onPress={handleContinueWithFacebook}
          />
          <IconButton
            icon="email"
            size={40}
            iconColor="white"
            style={{ backgroundColor: "#424d57", borderRadius: 10 }}
            onPress={() => handleView("Gmail_Password_View")}
          />
        </View>
      </>
    </Animated.View>
  );
}
