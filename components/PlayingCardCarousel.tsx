import { PlayingCard } from "@/models/solitaire";
import React, { FC, useCallback, useMemo } from "react";
import { View } from "react-native";
import { PlayingCardFace } from "./PlayingCard";

type Props = {
  cards: PlayingCard[];
  onPress: (card: PlayingCard) => void;
};
const PlayingCardCarousel_: FC<Props> = ({
  cards,
  onPress,
}) => {
  const items = useMemo(() => {
    const items: (PlayingCard | null)[][] = [
      [cards.at(0) ?? null, cards.at(1) ?? null],
      [cards.at(2) ?? null, cards.at(3) ?? null],
    ];

    return items;
  }, [cards]);

  const onPressHandlerProvider = useCallback(
    (card: PlayingCard) => () => onPress(card),
    [onPress]
  );

  return (
    <View style={{ flex: 1 }}>
      {items.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          {row.map((item, colIndex) => (
            <View
              key={colIndex}
              style={{
                margin: 2,
                flex: 1,
                flexGrow: 1,
                flexBasis: 0,
              }}
            >
              {item !== null ? (
                <PlayingCardFace
                  card={item}
                  onPress={onPressHandlerProvider(item)}
                />
              ) : (
                <View
                  style={{
                    width: "100%",
                    aspectRatio: "63/88",
                    borderRadius: 12,
                    backgroundColor: "#888",
                    userSelect: "none",
                  }}
                />
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export const PlayingCardCarousel = React.memo(
  PlayingCardCarousel_,
  (prevProps, nextProps) => {
    if (prevProps.cards.length !== nextProps.cards.length) {
      return false;
    }

    for (let i = 0; i < prevProps.cards.length; i++) {
      const pCard = prevProps.cards[i];
      const nCard = nextProps.cards[i];
      if (
        pCard.suit !== nCard.suit ||
        pCard.rank !== nCard.rank
      ) {
        return false;
      }
    }
    return true;
  }
);
