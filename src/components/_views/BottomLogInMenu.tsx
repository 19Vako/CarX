import { Icons } from "@/src/constants/images";
import React from "react";
import { Animated, Image, Text, View } from "react-native";
import normalize from "react-native-normalize";
import { Button, TextInput } from "react-native-paper";
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

            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            mode="outlined"
            icon={() => (
              <Image
                source={Icons.googleIcon}
                style={{ width: 20, height: 20 }}
              />
            )}
            buttonColor="#fff"
            textColor="#000"
            style={{
              width: "100%",
              borderRadius: 25,
              borderColor: "#424d57",
              borderWidth: 1,
              marginBottom: 15,
            }}
            contentStyle={{ height: 48 }}
            onPress={handleContinueWithGoogle}
          >
            Continue with Google
          </Button>

          <Button
            mode="outlined"
            buttonColor="#ffffff"
            textColor="#000000"
            icon={() => (
              <Image
                source={Icons.gmailIcon}
                style={{ width: 20, height: 20 }}
              />
            )}
            style={{
              width: "100%",
              borderRadius: 25,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
            contentStyle={{ height: 48, justifyContent: "center" }}
            onPress={() => handleView("Gmail_Password_View")}
          >
            Sign up with email
          </Button>
        </View>
      </>
    </Animated.View>
  );
}
