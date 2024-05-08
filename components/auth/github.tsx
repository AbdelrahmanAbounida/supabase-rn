import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { supabase } from "@/lib/supabase";
import Toast from "react-native-root-toast";
import { useRouter } from "expo-router";
import { Session } from "@supabase/supabase-js";
import AuthMessage from "./auth-message";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function GithubAuthButton() {
  // *****************
  // with supabase
  // *****************

  async function signInWithGithub() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log({ user });
      setloading(true);
      setloginError("");
      const { data: res, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: makeRedirectUri({
            scheme: "abdel.auth",
          }),
        },
      });
      console.log({ url: res?.url });
      console.log({ error });

      if (error) {
        if (error.message.length > 50) {
          setloginError("Something went wrong!");
        } else {
          setloginError(error.message);
        }
      } else {
        setuserLogedIn(true);
        // Toast.show("Successsfully Logedin.", {
        //   duration: Toast.durations.LONG,
        //   position: Toast.positions.BOTTOM,
        //   shadow: true,
        //   animation: true,
        //   hideOnPress: true,
        // });
      }
    } catch (error) {
      console.log({ error });
      // setotpSubmitted(false);
      setloginError("Something went wrong");
    } finally {
      setloading(false);
    }
  }

  const [loginError, setloginError] = useState("");
  const [loading, setloading] = useState(false);
  const [userLogedIn, setuserLogedIn] = useState(false);
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
    console.log({ session });
  }, [session]);

  // *****************
  // with expo
  // *****************

  //   const discovery = {
  //     authorizationEndpoint: "https://github.com/login/oauth/authorize",
  //     tokenEndpoint: "https://github.com/login/oauth/access_token",
  //     revocationEndpoint:
  //       "https://github.com/settings/connections/applications/Ov23li3WvbXDQM8vYSub",
  //   };
  //   const [request, response, promptAsync] = useAuthRequest(
  //     {
  //       clientId: "Ov23li3WvbXDQM8vYSub",
  //       scopes: ["identity"],
  //       redirectUri: makeRedirectUri({
  //         scheme: "abdel.auth",
  //       }),
  //     },
  //     discovery
  //   );

  //   React.useEffect(() => {
  //     if (response?.type === "success") {
  //       const { code } = response.params;
  //     }
  //   }, [response]);

  return (
    <View>
      {/* {loginError && <AuthMessage type="error" message={loginError} />} */}
      <TouchableOpacity onPress={signInWithGithub} disabled={loading}>
        {/** () => promptAsync() */}
        {/**  !request*/}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png"
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
