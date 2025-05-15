import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { View } from "react-native";

export const PlayingCardBack: FC = () => {
  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        borderRadius: 12,
        backgroundColor: "pink",
      }}
    >
      <LinearGradient
        colors={["#0d0d1a", "#555"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
};
