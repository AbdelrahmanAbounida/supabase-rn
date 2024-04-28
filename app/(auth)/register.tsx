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
// import { supabase } from "@/lib/supabase";

export const registerFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Email isn't valid" })
      .transform((value) => value.replaceAll(" ", "")),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], //, "password"
    message: "Passwords don't match",
  });

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  const handleRegister = async (data: z.infer<typeof registerFormSchema>) => {
    try {
      setloading(true);
      setregisterError("");
      const { data: res, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: "/(auth)/login",
        },
      });
      if (error) {
        if (error.message.length > 50) {
          setregisterError("Something went wrong!");
        } else {
          setregisterError(error.message);
        }
      }
      console.log(error);
      console.log({ user: res.user });
      if (res.session || res.user) {
        setregisterSuccess("An Email has been sent to you successfully");
      }
    } catch (error) {
      console.log({ error });
      setregisterError("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  const [registerError, setregisterError] = useState<string>("");
  const [registerSuccess, setregisterSuccess] = useState<string>("");
  const [viewPassword, setviewPassword] = useState<boolean>(false);
  const [loading, setloading] = useState(false);

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 25,
        backgroundColor: "#fff",
        height: "100%",
        overflow: "scroll",
      }}
    >
      <View style={styles.main}>
        {/** title */}
        <Text style={styles.title}>Create Account</Text>

        {/** subtitle */}
        <Text style={styles.subtitle}>
          Create an account so you can explore our app
        </Text>

        {/** Form */}
        <View style={styles.form}>
          {registerError && (
            <AuthMessage type="error" message={registerError} />
          )}
          {registerSuccess && (
            <AuthMessage type="success" message={registerSuccess} />
          )}
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
                  placeholder="Confirm Password"
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
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}
          <TouchableOpacity
            style={styles.btn}
            onPress={handleSubmit(handleRegister)}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ alignSelf: "center", color: "#fff" }}>
                Sign up
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/** Create new account */}
        <View style={{ marginTop: 19 }}>
          <Link
            href={"/(auth)/login"}
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: Colors.light.primary,
              textDecorationLine: "underline",
            }}
          >
            Already have an account ?
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
