import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { OtpInput } from "react-native-otp-entry";
import Toast from "react-native-root-toast";
import { supabase } from "@/lib/supabase";

export default function VerificationPhoneOTP({
  userPhone,
}: {
  userPhone: string;
}) {
  const handleOTPVerification = async (text: string) => {
    console.log({ userPhone });
    try {
      setvalidationLoading(true);
      const { data: res, error } = await supabase.auth.verifyOtp({
        phone: userPhone,
        token: text,
        type: "sms",
      });
      console.log({ user: res?.user });
      console.log({ SupaError: error });
      if (error) {
        if (error.message.length > 50) {
          Toast.show("Invalid OTP.", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            textStyle: {
              //   backgroundColor: "red",
              // color: "#fff",
              paddingHorizontal: 30,
            },
            containerStyle: {
              // backgroundColor: "red",
              width: "100%",
              marginHorizontal: 20,
              paddingHorizontal: 10,
            },
          });
        } else {
          Toast.show(error.message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            textStyle: {
              //   backgroundColor: "red",
              // color: "#fff",
              paddingHorizontal: 30,
            },
            containerStyle: {
              // backgroundColor: "red",
              width: "100%",
              marginHorizontal: 20,
              paddingHorizontal: 10,
            },
          });
        }
      }
    } catch (error) {
      console.log({ error });
      Toast.show("Something went wrong while validating your OTP.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        textStyle: {
          //   backgroundColor: "red",
          // color: "#fff",
          paddingHorizontal: 30,
        },
        containerStyle: {
          // backgroundColor: "red",
          width: "100%",
          marginHorizontal: 20,
          paddingHorizontal: 10,
        },
      });
    } finally {
      setvalidationLoading(false);
    }
  };
  const [validationLoading, setvalidationLoading] = useState(false);
  const [currentOTP, setcurrentOTP] = useState("");

  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          //   flex: 1,
          padding: 25,
          height: "100%",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            VerificationOTP
          </Text>

          <Text style={{ textAlign: "center", color: "#949191", fontSize: 15 }}>
            A 6-digits verification code we sent to your Phone{" "}
          </Text>

          <View
            style={{
              marginTop: 39,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Text style={{ color: "#949191", fontSize: 15, paddingBottom: 5 }}>
              Enter verification code here.
            </Text>
            {/** OTP Inputs */}
            <OtpInput
              numberOfDigits={6}
              focusColor={Colors.light.primary}
              focusStickBlinkingDuration={500}
              onTextChange={(text) => setcurrentOTP(text)}
              //   onTextChange={(text) => console.log(text)}
              onFilled={(text) => handleOTPVerification(text)}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                // containerStyle: styles.otpContainer,
                pinCodeContainerStyle: styles.pinCodeContainer,
                //   pinCodeTextStyle: styles.pinCodeText,
                //   focusStickStyle: styles.focusStick,
                //   focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleOTPVerification(currentOTP)}
          style={{
            backgroundColor:
              currentOTP.length < 6 ? "gray" : Colors.light.primary,
            borderRadius: 29,
            width: "100%",
            alignItems: "center",
            paddingVertical: 10,
          }}
          disabled={currentOTP.length < 6}
        >
          {validationLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontSize: 19, fontWeight: "bold" }}>
              Verify
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
  },
  pinCodeContainer: {
    backgroundColor: "#fff",
    // width: 58,
    // height: 58,
    // borderRadius: 12,
  },
});
