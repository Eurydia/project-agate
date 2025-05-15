import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Suit = "hearts" | "diamonds" | "clubs" | "spades";
type Rank =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "10"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

export type PlayingCard = {
  id: string;
  rank: Rank;
  suit: Suit;
};

const suitIcon: Record<
  Suit,
  keyof typeof MaterialCommunityIcons.glyphMap
> = {
  hearts: "cards-heart",
  diamonds: "cards-diamond",
  clubs: "cards-club",
  spades: "cards-spade",
};

const SUIT_COLOR: Record<Suit, string> = {
  hearts: "#d22",
  diamonds: "#d22",
  clubs: "#000",
  spades: "#000",
};

type Props = {
  item: PlayingCard;
};
export const PlayingCardFace: FC<Props> = ({ item }) => {
  const color = useMemo(
    () => SUIT_COLOR[item.suit],
    [item.suit]
  );

  const suit = useMemo(
    () => suitIcon[item.suit],
    [item.suit]
  );

  return (
    <View style={[styles.card, { width: 150 }]}>
      <Text
        style={[
          styles.rankText,
          { color, fontSize: 150 * 0.6 },
        ]}
      >
        {item.rank}
      </Text>
      <MaterialCommunityIcons
        name={suit}
        style={[
          styles.suitIcon,
          { color, fontSize: 150 * 0.6 },
        ]}
      />
    </View>
  );
};

const BORDER_RADIUS = 12;

const styles = StyleSheet.create({
  card: {
    aspectRatio: "63/88",
    borderRadius: BORDER_RADIUS,
    backgroundColor: "#fff",
    userSelect: "none",
  },
  rankText: {
    position: "absolute",
    fontWeight: "bold",
    top: 0,
    left: 0,
  },
  suitIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
