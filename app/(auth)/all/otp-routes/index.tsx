import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { usePathname, useRouter } from "expo-router";
import { makeRedirectUri } from "expo-auth-session";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "@/constants/routes";
import Colors from "@/constants/Colors";

interface OTPRouteProps {
  route: string;
  title: string;
}

export default function Otp() {
  // check session here
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setloading] = useState(true);

  const OPTRoutes: OTPRouteProps[] = [
    { title: "Email", route: "email/" },
    { title: "Phone", route: "phone/" },
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setloading(false);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  const currentPath = usePathname();
  const router = useRouter();

  return (
    <SafeAreaView>
      {/** choose between opts */}
      <View style={styles.main}>
        {OPTRoutes.map((route, index) => (
          <TouchableOpacity
            style={styles.btn}
            key={index}
            onPress={() =>
              router.push(`/(auth)/all/otp-routes/${route.route}` as any)
            }
          >
            <Text style={styles.btntext}>{route.title}</Text>
          </TouchableOpacity>
        ))}

        {/* <Link href={"/(auth)/all/textlocal-sms"} style={styles.press}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Textlocal SMS
          </Text>
        </Link> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    paddingTop: 50,
    gap: 15,
  },
  btn: {
    backgroundColor: Colors.blue,
    paddingVertical: 10,
    borderRadius: 7,
    width: "70%",
    alignItems: "center",
  },
  btntext: {
    color: "#fff",
    textAlign: "center",
  },
});
