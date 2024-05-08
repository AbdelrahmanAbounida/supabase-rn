import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import Colors from "@/constants/Colors";

export default function SplashScreenView() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/images/plane.png")}
          alt="plane"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 335,
    height: 172,
    // flex: 1,
    // resizeMode: "cover",
    // justifyContent: "center",
  },
  container: {
    backgroundColor: Colors.light.primary,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
