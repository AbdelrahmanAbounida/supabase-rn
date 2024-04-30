import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView style={{ padding: 20 }}>
      <ScrollView contentContainerStyle={styles.main}>
        <Link href={"/(auth)/login"} style={styles.press}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Email-password
          </Text>
        </Link>
        <Link href={"/(auth)/all/magic-link"} style={styles.press}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Email Magic Link
          </Text>
        </Link>
        <Link href={"/(auth)/all/otp"} style={styles.press}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Email one-time password (OTP)
          </Text>
        </Link>
        <Link href={"/(auth)/all/messagebird-sms"} style={styles.press}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            MessageBird SMS
          </Text>
        </Link>

        <Link href={"/(auth)/all/twillio-sms"} style={styles.press}>
          <Text style={{ color: "#fff", textAlign: "center" }}>Twilio SMS</Text>
        </Link>

        <Link href={"/(auth)/all/vontage-sms"} style={styles.press}>
          <Text style={{ color: "#fff", textAlign: "center" }}>Vonage SMS</Text>
        </Link>

        <Link href={"/(auth)/all/textlocal-sms"} style={styles.press}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Textlocal SMS
          </Text>
        </Link>

        <Link href={"/(auth)/all/sso"} style={styles.press}>
          <Text style={{ color: "#fff", textAlign: "center" }}>SSO- SAML</Text>
        </Link>

        <Link href={"/(auth)/all/captcha"} style={styles.press}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Captcha Protection
          </Text>
        </Link>

        <Link href={"/(auth)/all/social-auth"} style={styles.press}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Social OAuth
          </Text>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  press: {
    paddingVertical: 10,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 20,
    borderRadius: 7,
    width: "70%",
  },
});
