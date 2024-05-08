import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AuthMessage from "@/components/auth/auth-message";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import Colors from "@/constants/Colors";
import Toast from "react-native-root-toast";
import VerificationOTP from "@/components/VerifyOTP";
import { useRouter } from "expo-router";
import { Session } from "@supabase/supabase-js";

const otpEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email not valid" })
    .transform((value) => value.replaceAll(" ", "")),
});

export default function OTPEmail() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof otpEmailSchema>>({
    resolver: zodResolver(otpEmailSchema),
  });

  const handleEmailOTP = async (data: z.infer<typeof otpEmailSchema>) => {
    try {
      setloading(true);
      setOTPError("");
      setuserEmail("");
      const { data: res, error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          shouldCreateUser: true, // it gonna create a user if it doest exist like upsert
        },
      });
      console.log({ user: res?.user });

      if (error) {
        if (error.message.length > 50) {
          setOTPError("Something went wrong!");
        } else {
          setOTPError(error.message);
        }
      } else {
        setuserEmail(data.email);
        Toast.show("Please Check your email.", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      }
      setotpSubmitted(true);
      Toast.show("Please Check your email.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        hideOnPress: true,
        textStyle: {
          fontSize: 14,
          paddingHorizontal: 27,
        },
      });
    } catch (error) {
      console.log({ error });
      setotpSubmitted(false);
      setOTPError("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  const [otpError, setOTPError] = useState<string>("");
  const [userEmail, setuserEmail] = useState<string>("");
  const [loading, setloading] = useState(false);
  const [otpSubmitted, setotpSubmitted] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setloading(false);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <SafeAreaView>
      {otpSubmitted && userEmail.length > 0 ? (
        <VerificationOTP userEmail={userEmail} />
      ) : (
        <View style={styles.main}>
          {/** title */}
          <Text style={styles.title}>Email OTP</Text>
          {/** Form */}
          <View style={styles.form}>
            {otpError && <AuthMessage type="error" message={otpError} />}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inpt}>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={Colors.light.gray}
                    placeholder="Email"
                  />
                </View>
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
            <TouchableOpacity
              onPress={handleSubmit(handleEmailOTP)}
              style={styles.btn}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{ alignSelf: "center", color: "#fff" }}>
                  Sign in
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 27,
    textAlign: "center",
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    width: "80%",
    maxWidth: 500,
  },
  btn: {
    marginTop: 25,
    width: "100%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 17,
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  inpt: {
    borderWidth: 1,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 9,
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.lightBlue,
    marginTop: 25,
    position: "relative",
  },
  errorText: {
    color: "red",
    width: "100%",
    marginLeft: 9,
    paddingTop: 3,
  },
});
