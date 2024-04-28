import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";

export default function SocialAuth() {
  return (
    <SafeAreaView style={{ padding: 20 }}>
      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <TouchableOpacity>
          {/* <Ionicons
            name="logo-google"
            size={20}
            style={{ backgroundColor: "#FCFCFC", borderRadius: 4, padding: 10 }}
          /> */}
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://banner2.cleanpng.com/20180423/gkw/kisspng-google-logo-logo-logo-5ade7dc753b015.9317679115245306313428.jpg"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Ionicons
            name="logo-facebook"
            size={20}
            style={{ backgroundColor: "#FCFCFC", borderRadius: 4, padding: 10 }}
          /> */}
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Ionicons
            name="logo-apple"
            size={20}
            style={{ backgroundColor: "#FCFCFC", borderRadius: 4, padding: 10 }}
          /> */}
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://banner2.cleanpng.com/20180616/yox/kisspng-apple-logo-apple-logo-5b25941fc205b9.8465606115291894077947.jpg"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Ionicons
            name="logo-microsoft"
            size={20}
            style={{ backgroundColor: "#FCFCFC", borderRadius: 4, padding: 10 }}
          /> */}
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://static.vecteezy.com/system/resources/previews/027/127/473/non_2x/microsoft-logo-microsoft-icon-transparent-free-png.png"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Ionicons
            name="logo-twitter"
            size={20}
            style={{ backgroundColor: "#FCFCFC", borderRadius: 4, padding: 10 }}
          /> */}
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Ionicons
            name="logo-github"
            size={20}
            style={{ backgroundColor: "#FCFCFC", borderRadius: 4, padding: 10 }}
          /> */}
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Ionicons
            name="logo-gitlab"
            size={20}
            style={{ backgroundColor: "#FCFCFC", borderRadius: 4, padding: 10 }}
          /> */}
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc5d3d6LQOo6M0lm9qsQ-dQcVXRYtwbk2HFWe0x365rLEfUxcKqoOB7TFkVBkk2Rco1qI&usqp=CAU"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Ionicons
            name="logo-bitbucket"
            size={20}
            style={{ backgroundColor: "#FCFCFC", borderRadius: 4, padding: 10 }}
          /> */}
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/44_Bitbucket_logo_logos-512.png"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Ionicons
            name="logo-discord"
            size={20}
            style={{ backgroundColor: "#FCFCFC", borderRadius: 4, padding: 10 }}
          /> */}
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://static.vecteezy.com/system/resources/previews/023/741/147/non_2x/discord-logo-icon-social-media-icon-free-png.png"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1667px-Figma-logo.svg.png"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://static.vecteezy.com/system/resources/previews/023/986/970/non_2x/linkedin-logo-linkedin-logo-transparent-linkedin-icon-transparent-free-free-png.png"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://static-00.iconduck.com/assets.00/twitch-icon-2048x2048-tipdihgh.png"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
            }}
            source="https://cdn.icon-icons.com/icons2/3041/PNG/512/zoom_logo_icon_189240.png"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
              borderRadius: 4,
            }}
            source="https://i0.wp.com/brandingforum.org/wp-content/uploads/2023/10/Spotify-logo-500x281-1.png?resize=500%2C281&ssl=1"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            contentFit="contain"
            style={{
              width: 43,
              height: 43,
            }}
            source="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            contentFit="contain"
            style={{
              width: 35,
              height: 35,
              borderRadius: 4,
            }}
            source="https://cdn.42matters.com/sdk/developers.kakao.com.png"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            contentFit="contain"
            style={{
              width: 37,
              height: 37,
              borderRadius: 4,
            }}
            source="https://seeklogo.com/images/W/workos-icon-logo-4D02E60A6C-seeklogo.com.png"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            contentFit="contain"
            style={{
              width: 37,
              height: 37,
              borderRadius: 4,
            }}
            source="https://upload.wikimedia.org/wikipedia/commons/2/29/Keycloak_Logo.png"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
