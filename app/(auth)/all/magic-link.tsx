import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { authstyles as styles } from "@/styles/auth";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import AuthMessage from "@/components/auth/auth-message";
import { makeRedirectUri } from "expo-auth-session";

const magicLinkSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email not valid" })
    .transform((value) => value.replaceAll(" ", "")),
});

export default function MagicLink() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof magicLinkSchema>>({
    resolver: zodResolver(magicLinkSchema),
  });
  const redirectTo = makeRedirectUri();
  console.log({ redirectTo });

  const handleLogin = async (data: z.infer<typeof magicLinkSchema>) => {
    try {
      setloading(true);
      setloginError("");
      const { data: res, error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          emailRedirectTo: "exp://192.168.0.115:8081", //redirectTo,
          shouldCreateUser: true,
        },
      });
      console.log({ user: res.user });
      console.log({ error });
      if (error) {
        if (error.message.length > 50) {
          setloginError("Something went wrong!");
        } else {
          setloginError(error.message);
        }
      }
    } catch (error) {
      console.log({ error });
      setloginError("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  const [loginError, setloginError] = useState<string>("");
  const [loading, setloading] = useState(false);

  return (
    <SafeAreaView
      style={{ padding: 25, backgroundColor: "#fff", height: "100%" }}
    >
      <View style={styles.main}>
        {/** title */}
        <Text style={styles.title}>Magic Link</Text>

        {/** subtitle */}
        <Text
          style={{
            marginTop: 15,
            fontSize: 15,
            maxWidth: 220,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Login-signup with email only
        </Text>

        {/** Form */}
        <View style={styles.form}>
          {loginError && <AuthMessage type="error" message={loginError} />}
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
            onPress={handleSubmit(handleLogin)}
            style={styles.btn}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ alignSelf: "center", color: "#fff" }}>
                Sign in magic
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/** Create new account */}
        <View style={{ marginTop: 19 }}>
          <Link
            href={"/(auth)/register"}
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: Colors.light.primary,
              textDecorationLine: "underline",
            }}
          >
            Create new account
          </Link>
          <Link
            href={"/"}
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: Colors.light.primary,
              textDecorationLine: "underline",
              marginTop: 10,
            }}
          >
            Back to Home
          </Link>
        </View>

        {/** Oauth2 */}
        <View style={styles.authmaincontainer}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 13,
              color: Colors.light.primary,
            }}
          >
            Or Continue with
          </Text>

          <View style={styles.authsubcontainer}>
            <TouchableOpacity style={styles.authIcon}>
              <Ionicons name="logo-google" size={25} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.authIcon}>
              <Ionicons name="logo-facebook" size={25} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.authIcon}>
              <Ionicons name="logo-apple" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
