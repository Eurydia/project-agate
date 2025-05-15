import { shuffler } from "d3-array";
import {
  CardRanks,
  CardSuits,
  createPlayingCard,
  PlayingCard,
} from "./cards";

export type Deck = PlayingCard[];

export const getCompleteDeck = (): Deck => {
  const deck: Deck = [];
  for (const suit in CardSuits) {
    for (const rank in CardRanks) {
      deck.push(
        createPlayingCard(
          CardSuits[suit as keyof typeof CardSuits],
          CardRanks[rank as keyof typeof CardRanks]
        )
      );
    }
  }

  return deck;
};

export const shuffleDeck = (
  seed: () => number,
  deck: Deck
) => {
  const shuffle = shuffler(seed);
  shuffle(deck);
};
