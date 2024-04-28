import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
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

const loginformSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email not valid" })
    .transform((value) => value.replaceAll(" ", "")),
  password: z
    .string()
    .min(1, { message: "password mustn't be less than 4 characters" }),
});

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginformSchema>>({
    resolver: zodResolver(loginformSchema),
  });

  const handleLogin = async (data: z.infer<typeof loginformSchema>) => {
    // const { error } = await supabase.auth.signOut()

    try {
      setloading(true);
      setloginError("");
      const { data: res, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      console.log({ user: res.user });
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
  const [viewPassword, setviewPassword] = useState<boolean>(false);
  const [loading, setloading] = useState(false);

  return (
    <SafeAreaView
      style={{ padding: 25, backgroundColor: "#fff", height: "100%" }}
    >
      <View style={styles.main}>
        {/** title */}
        <Text style={styles.title}>Login here</Text>

        {/** subtitle */}
        <Text style={styles.subtitle}>Welcome back you've been missed!</Text>

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
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inpt}>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={Colors.light.gray}
                  secureTextEntry={!viewPassword}
                  placeholder="Password"
                />
                {viewPassword ? (
                  <Ionicons
                    onPress={() => setviewPassword(!viewPassword)}
                    style={{ position: "absolute", right: 7, top: "50%" }}
                    name="eye-off"
                    size={20}
                    color={Colors.light.primary}
                  />
                ) : (
                  <Ionicons
                    onPress={() => setviewPassword(!viewPassword)}
                    style={{ position: "absolute", right: 7, top: "50%" }}
                    name="eye"
                    size={20}
                    color={Colors.light.primary}
                  />
                )}
              </View>
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          <View style={styles.forgetcontainer}>
            <Link href={"/(auth)/login"} style={styles.forget}>
              <Text>Forgot Your password?</Text>
            </Link>
          </View>

          <TouchableOpacity
            onPress={handleSubmit(handleLogin)}
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
};

export default Login;
