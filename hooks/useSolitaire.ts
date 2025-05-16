import {
  CardSuits,
  Deck,
  PlayingCard,
} from "@/models/solitaire";
import {
  getCompleteDeck,
  getValueFromCardRank,
  shuffleDeck,
} from "@/services/solitaire";
import _ from "lodash";
import { useEffect, useState } from "react";

const structuredClone = _.cloneDeep;

export const useSolitaire = () => {
  const [gameState, setGameState] = useState<{
    deck: Deck;
    drawnPiles: Deck;
    weaponKillPile: Deck;
    isPotionBlocked: boolean;
    isEscapeBlocked: boolean;
    health: number;
    weapon: number;
  }>({
    deck: [],
    drawnPiles: [],
    weaponKillPile: [],
    isPotionBlocked: false,
    health: 20,
    weapon: 0,
    isEscapeBlocked: false,
  });

  const restartRun = () => {
    const newDeck = getCompleteDeck();
    shuffleDeck(() => 1000, newDeck);

    const revealed: Deck = [];
    while (revealed.length < 4) {
      revealed.push(newDeck.pop()!);
    }
    setGameState({
      deck: newDeck,
      drawnPiles: revealed,
      weaponKillPile: [],
      isPotionBlocked: false,
      health: 20,
      weapon: 0,
      isEscapeBlocked: false,
    });
  };

  const discardCard = (card: PlayingCard) => {
    setGameState((prev) => {
      const {
        deck,
        drawnPiles,
        isPotionBlocked,
        isEscapeBlocked,
      } = prev;
      const nextDeck = [...deck];
      const nextDrawnPile = [...drawnPiles].filter(
        ({ rank, suit }) =>
          rank !== card.rank || suit !== card.suit
      );

      let nextIsEscapeBlocked = isEscapeBlocked;
      let nextIsPotionBlocked = isPotionBlocked;
      if (nextDrawnPile.length <= 1 && deck.length > 0) {
        while (nextDrawnPile.length < 4) {
          const card = nextDeck.pop();
          if (card === undefined) {
            break;
          }
          nextDrawnPile.push(card);
        }
        nextIsPotionBlocked = false;
        nextIsEscapeBlocked = false;
      }

      const next = structuredClone(prev);
      next.deck = nextDeck;
      next.drawnPiles = nextDrawnPile;
      next.isPotionBlocked = nextIsPotionBlocked;
      next.isEscapeBlocked = nextIsEscapeBlocked;
      return next;
    });
  };

  const consumePotion = (card: PlayingCard) => {
    setGameState((prev) => {
      const { isPotionBlocked, health } = prev;
      if (isPotionBlocked) {
        return prev;
      }
      const nextHealth = Math.min(
        health + getValueFromCardRank(card.rank),
        20
      );
      const next = structuredClone(prev);
      next.health = nextHealth;
      next.isPotionBlocked = true;
      return next;
    });
  };

  const equipWeapon = (card: PlayingCard) => {
    setGameState((prev) => {
      const next = structuredClone(prev);
      next.weaponKillPile = [];
      next.weapon = getValueFromCardRank(card.rank);
      return next;
    });
  };

  const fightMonster = (card: PlayingCard) => {
    setGameState((prev) => {
      const { weaponKillPile, weapon, health } = prev;
      const damage = getValueFromCardRank(card.rank);
      const blockedDamage = Math.max(damage - weapon, 0);

      const prevKill = weaponKillPile.at(-1);

      const next = structuredClone(prev);

      if (prevKill === undefined) {
        next.health = health - blockedDamage;
        next.weaponKillPile.push(card);
        return next;
      }

      const prevKillValue = getValueFromCardRank(
        prevKill.rank
      );
      if (damage >= prevKillValue) {
        next.health = health - damage;
        return next;
      }

      next.health = health - blockedDamage;
      next.weaponKillPile.push(card);
      return next;
    });
  };

  const selectCard = (card: PlayingCard) => {
    switch (card.suit) {
      case CardSuits.HEARTS:
        consumePotion(card);
        break;
      case CardSuits.DIAMONDS:
        equipWeapon(card);
        break;
      case CardSuits.SPADES:
      case CardSuits.CLUBS:
        fightMonster(card);
        break;
    }
    discardCard(card);
  };

  const escapeRoom = () => {
    setGameState((prev) => {
      const { isEscapeBlocked, drawnPiles } = prev;
      if (isEscapeBlocked) {
        return prev;
      }
      if (drawnPiles.length < 4) {
        return prev;
      }
      const next = structuredClone(prev);
      next.isEscapeBlocked = true;

      shuffleDeck(() => 1000, next.drawnPiles);
      next.deck = [...next.drawnPiles, ...next.deck];
      next.drawnPiles = [];
      while (next.drawnPiles.length < 4) {
        const card = next.deck.pop();
        if (card === undefined) {
          break;
        }
        next.drawnPiles.push(card);
      }
      return next;
    });
  };

  useEffect(() => {
    restartRun();
  }, []);

  return {
    restartRun,
    selectCard,
    escapeRoom,
    gameState,
  };
};
