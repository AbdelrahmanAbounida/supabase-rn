import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function Ready() {
  return (
    <View>
      <Image
        style={styles.upperImage}
        source={require("../../../../assets/images/ready-otp.png")}
      />

      <Image
        style={styles.middleImage}
        source={require("../../../../assets/images/otp-tick.png")}
      />

      <View style={styles.middleContainer}>
        <Text>Ready to Fly!</Text>
        <Text>Your account has been created successfully.</Text>

        <TouchableOpacity style={styles.backBtn}>
          <Text>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  middleContainer: {},
  upperImage: {},
  middleImage: {},
  mainTitle: {},
  secondaryTitle: {},
  backBtn: {},
  backBtnText: {},
});
