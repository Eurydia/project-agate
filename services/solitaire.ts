import {
  CardRanks,
  CardSuits,
  Deck,
  PlayingCard,
} from "@/models/solitaire";
import { shuffler } from "d3-array";
import { randomLcg } from "d3-random";

export const getValueFromCardRank = (
  rank: CardRanks
): number => {
  switch (rank) {
    case CardRanks.ACE:
      return 14;
    case CardRanks.TWO:
      return 2;
    case CardRanks.THREE:
      return 3;
    case CardRanks.FOUR:
      return 4;
    case CardRanks.FIVE:
      return 5;
    case CardRanks.SIX:
      return 6;
    case CardRanks.SEVEN:
      return 7;
    case CardRanks.EIGHT:
      return 8;
    case CardRanks.NINE:
      return 9;
    case CardRanks.TEN:
      return 10;
    case CardRanks.JACK:
      return 11;
    case CardRanks.QUEEN:
      return 12;
    case CardRanks.KING:
      return 13;
    default:
      throw new Error("Invalid card rank");
  }
};

export const getLabelFromCardRank = (
  rank: CardRanks
): string => {
  switch (rank) {
    case CardRanks.ACE:
      return "A";
    case CardRanks.TWO:
      return "2";
    case CardRanks.THREE:
      return "3";
    case CardRanks.FOUR:
      return "4";
    case CardRanks.FIVE:
      return "5";
    case CardRanks.SIX:
      return "6";
    case CardRanks.SEVEN:
      return "7";
    case CardRanks.EIGHT:
      return "8";
    case CardRanks.NINE:
      return "9";
    case CardRanks.TEN:
      return "10";
    case CardRanks.JACK:
      return "J";
    case CardRanks.QUEEN:
      return "Q";
    case CardRanks.KING:
      return "K";
    default:
      throw new Error("Invalid card rank");
  }
};

export const createPlayingCard = (
  suit: CardSuits,
  rank: CardRanks
): PlayingCard => {
  return { suit, rank };
};

export const getCompleteDeck = (): Deck => {
  const deck: Deck = [];
  const suits = [
    CardSuits.SPADES,
    CardSuits.HEARTS,
    CardSuits.DIAMONDS,
    CardSuits.CLUBS,
  ];
  const ranks = [
    CardRanks.ACE,
    CardRanks.TWO,
    CardRanks.THREE,
    CardRanks.FOUR,
    CardRanks.FIVE,
    CardRanks.SIX,
    CardRanks.SEVEN,
    CardRanks.EIGHT,
    CardRanks.NINE,
    CardRanks.TEN,
    CardRanks.JACK,
    CardRanks.QUEEN,
    CardRanks.KING,
  ];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push(createPlayingCard(suit, rank));
    }
  }

  return deck;
};

const shuffle = shuffler(randomLcg(17912965));
export const shuffleDeck = (
  seed: () => number,
  deck: Deck
) => {
  shuffle(deck);
};
