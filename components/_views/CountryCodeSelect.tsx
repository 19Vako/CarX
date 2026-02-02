import React from "react";
import { Text, TouchableOpacity } from "react-native";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import { CountryCodeSelectViewMode } from "../_viewsModels/CountryCodeSelectViewModel";

const CountryCodeSelect = ({
  countryTextCode,
  setCountryTextCode,
  setCountryCode,
  countryCode,
}: {
  countryTextCode: CountryCode;
  setCountryTextCode: (TextCode: CountryCode) => void;
  setCountryCode: (code: string) => void;
  countryCode: string;
}) => {

  const {isVisible, setIsVisible} = CountryCodeSelectViewMode()


  return (
    <TouchableOpacity
      onPress={() => setIsVisible(true)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 52,
        width: 90,
        borderRadius: 5,
        borderColor: "gray",
        borderWidth: 0.3,
        backgroundColor: "#424d57",
      }}
    >
      <CountryPicker
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        countryCode={countryTextCode}
        onSelect={(country) => {
          setCountryTextCode(country.cca2);
          setCountryCode(country.callingCode[0]);
        }}
        containerButtonStyle={{
          borderRadius: 5,
          borderColor: "white",
          backgroundColor: "#424d57",
        }}
        withFilter
        withFlag
      />
      <Text style={{ color: "white", fontSize: 15 }}>+{countryCode}</Text>
    </TouchableOpacity>
  );
};

export default CountryCodeSelect;
