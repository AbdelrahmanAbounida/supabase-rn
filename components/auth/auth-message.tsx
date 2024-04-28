import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export interface AuthMessageProps {
  type: "success" | "error";
  message: string;
}

export default function AuthMessage({ type, message }: AuthMessageProps) {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: type === "error" ? "#FBE2E2" : "#DCFCE7",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        paddingVertical: 11,
        borderRadius: 5,
        gap: 5,
        paddingHorizontal: 11,
      }}
    >
      <Ionicons
        size={17}
        name={type === "error" ? "warning" : "checkmark-circle"}
        color={type === "error" ? "red" : "green"}
      />
      <Text style={{ color: "red", textAlign: "center" }}>{message}</Text>
    </View>
  );
}
