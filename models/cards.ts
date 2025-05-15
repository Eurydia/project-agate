export enum CardSuits {
  HEARTS,
  DIAMONDS,
  CLUBS,
  SPADES,
}

export enum CardRanks {
  ACE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
}

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

export type PlayingCard = {
  suit: CardSuits;
  rank: CardRanks;
};

export const createPlayingCard = (
  suit: CardSuits,
  rank: CardRanks
): PlayingCard => {
  return { suit, rank };
};
