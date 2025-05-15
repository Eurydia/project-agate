import PlayingCardCourasel from "@/components/PlayingCardCourasel";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React from "react";
import {
  FlatList,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function RegalRankScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <StatusBar backgroundColor="#000" />
      <View style={{ flexGrow: 1, margin: 2 }}>
        <Pressable style={{ flexGrow: 1 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: 12,
            }}
          >
            <MaterialCommunityIcons
              name="replay"
              size={30}
            />
          </View>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "auto",
        }}
      >
        <FlatList
          numColumns={2}
          data={[
            ["heart-multiple", 18],
            ["cards", 18],
            ["trash-can", 18],
            ["sword", 18],
          ]}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                borderRadius: 12,
                flexDirection: "row",
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 8,
                margin: 2,
              }}
            >
              <MaterialCommunityIcons
                name={
                  item[0] as keyof typeof MaterialCommunityIcons.glyphMap
                }
                size={30}
              />
              <Text style={{ fontSize: 30 }}>
                {item[1]}
              </Text>
            </View>
          )}
        />
      </View>
      <View
        style={{
          flexGrow: 2,
          borderRadius: 12,
          borderColor: "#fff",
          borderWidth: 1,
          margin: 2,
        }}
      >
        <FlatList
          data={["lorem", "ipsum", "dolor", "sit", "amet"]}
          renderItem={({ item }) => (
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                fontFamily: "monospace",
              }}
            >
              {item}
            </Text>
          )}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 2,
        }}
      >
        <View style={{ flexShrink: 1 }}>
          <PlayingCardCourasel />
        </View>
        <Pressable
          style={{
            flexGrow: 1,
            margin: 2,
          }}
          onLongPress={() => {
            alert("");
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: 12,
            }}
          >
            <MaterialCommunityIcons
              name="run"
              size={50}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

