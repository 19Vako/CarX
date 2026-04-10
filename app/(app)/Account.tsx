import AccountMenuList from "@/src/components/_views/AccountMenuList";
import ProfileHeader from "@/src/components/_views/ProfileHeader";
import ProfileLogOutButton from "@/src/components/_views/ProfileLogOutButton";
import ProfileRating from "@/src/components/_views/ProfileRating";
import ProfileSection from "@/src/components/_views/ProfileSection";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Account = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <ProfileHeader />
        <ProfileSection />
        <ProfileRating />
        <AccountMenuList />
        <ProfileLogOutButton />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222730",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
});

export default Account;
