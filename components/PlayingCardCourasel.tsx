import React from "react";
import { FlatList, View } from "react-native";
import {
  PlayingCard,
  PlayingCardFace,
} from "./PlayingCard";

const cards: PlayingCard[] = [
  { id: "ah", rank: "A", suit: "hearts" },
  { id: "kc", rank: "K", suit: "clubs" },
  { id: "7d", rank: "7", suit: "diamonds" },
  { id: "7s", rank: "7", suit: "spades" },
];

export default function PlayingCardCourasel() {
  return (
    <FlatList
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
      numColumns={2}
      data={cards}
      renderItem={({ item }) => (
        <View style={{ margin: 2 }}>
          <PlayingCardFace item={item} />
        </View>
      )}
    />
  );
}
