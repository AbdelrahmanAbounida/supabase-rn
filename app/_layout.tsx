import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, usePathname, useRouter } from "expo-router";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "@/constants/routes";
import { makeRedirectUri } from "expo-auth-session";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  // check session here
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  const currentPath = usePathname();
  const router = useRouter();

  const redirectTo = makeRedirectUri();
  console.log({ redirectTo });

  useEffect(() => {
    if (session) {
      if (AUTH_ROUTES.includes(currentPath)) {
        router.push("/(tabs)");
      }
    } else {
      if (PUBLIC_ROUTES.includes(currentPath)) {
        return;
      } else if (!AUTH_ROUTES.includes(currentPath)) {
        // router.push("/(auth)/login");
        console.log("true");
        console.log(currentPath);
        router.push("/login");
      }
    }
  }, [session, currentPath]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal/index" options={{ presentation: "modal" }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
