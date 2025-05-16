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

export type PlayingCard = {
  suit: CardSuits;
  rank: CardRanks;
};

export type Deck = PlayingCard[];
