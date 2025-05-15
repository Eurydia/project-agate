import { Deck, getCompleteDeck, shuffleDeck } from "./deck";

class SolitaireScoundrel {
  deck: Deck;
  discard: Deck;
  drawn: Deck;
  health: number = 20;
  weapon: number = 0;

  potionBlocked: boolean = false;

  constructor() {
    this.deck = getCompleteDeck();
    shuffleDeck(() => 1000, this.deck);

    this.drawn = [];
    for (let i = 0; i < 5; i++) {
      this.drawn.push(this.deck.pop()!);
    }
    this.discard = [];
  }

  public incHealth(health: number) {
    if (!this.potionBlocked) {
      this.health = Math.min(this.health + health, 20);
    }
  }
  public decHealth(health: number) {
    this.health = Math.max(this.health - health, 0);
  }
}
