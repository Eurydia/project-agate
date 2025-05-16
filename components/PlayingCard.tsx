import { CardSuits, PlayingCard } from "@/models/solitaire";
import { getLabelFromCardRank } from "@/services/solitaire";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC, useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SUIT_ICON: Record<
  CardSuits,
  keyof typeof MaterialCommunityIcons.glyphMap
> = {
  [CardSuits.HEARTS]: "cards-heart",
  [CardSuits.DIAMONDS]: "cards-diamond",
  [CardSuits.CLUBS]: "cards-club",
  [CardSuits.SPADES]: "cards-spade",
};
const SUIT_COLOR: Record<CardSuits, string> = {
  [CardSuits.HEARTS]: "#FF0000",
  [CardSuits.DIAMONDS]: "#FF0000",
  [CardSuits.CLUBS]: "#000000",
  [CardSuits.SPADES]: "#000000",
};

const styles = StyleSheet.create({
  card: {
    aspectRatio: "63/88",
    borderRadius: 12,
    backgroundColor: "#fff",
    userSelect: "none",
  },
  rankText: {
    position: "absolute",
    fontWeight: "bold",
    top: 0,
    left: 0,
    fontSize: 90,
  },
  suitIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: 90,
  },
});

type Props = {
  card: PlayingCard;
  onPress: () => void;
};
const PlayingCardFace_: FC<Props> = ({ card, onPress }) => {
  const color = useMemo(
    () => SUIT_COLOR[card.suit],
    [card.suit]
  );

  const suit = useMemo(
    () => SUIT_ICON[card.suit],
    [card.suit]
  );

  const rank = useMemo(
    () => getLabelFromCardRank(card.rank),
    [card.rank]
  );

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
      }}
    >
      <View style={styles.card}>
        <Text style={[styles.rankText, { color }]}>
          {rank}
        </Text>
        <MaterialCommunityIcons
          name={suit}
          style={[styles.suitIcon, { color }]}
        />
      </View>
    </Pressable>
  );
};

export const PlayingCardFace = React.memo(
  PlayingCardFace_,
  (prevProps, nextProps) => {
    return (
      prevProps.card.suit === nextProps.card.suit &&
      prevProps.card.rank === nextProps.card.rank
    );
  }
);
