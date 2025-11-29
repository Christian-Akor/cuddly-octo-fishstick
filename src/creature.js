/**
 * Cuddly Octo Fishstick Creature Generator
 * 
 * This module generates and manages unique hybrid creatures that are
 * part cuddly, part octopus, and part fishstick! 🐙🐟
 */

const ADJECTIVES = [
  'Fluffy', 'Squishy', 'Sparkly', 'Bouncy', 'Wiggly',
  'Snuggly', 'Fuzzy', 'Glittery', 'Jolly', 'Cozy'
];

const COLORS = [
  'Rainbow', 'Cosmic Purple', 'Ocean Blue', 'Sunset Orange',
  'Neon Green', 'Bubblegum Pink', 'Midnight Black', 'Golden'
];

const SPECIAL_ABILITIES = [
  'Can blow rainbow bubbles',
  'Gives the warmest hugs',
  'Can dance the tentacle tango',
  'Leaves a trail of glitter',
  'Can juggle 8 fishsticks at once',
  'Speaks fluent bubble language',
  'Can predict the weather with 50% accuracy',
  'Makes excellent sushi recommendations'
];

class CuddlyOctoFishstick {
  constructor(options = {}) {
    this.id = options.id || this.generateId();
    this.name = options.name || this.generateName();
    this.color = options.color || this.randomFrom(COLORS);
    this.tentacles = options.tentacles ?? 8;
    this.cuddlinessLevel = options.cuddlinessLevel ?? Math.floor(Math.random() * 10) + 1;
    this.specialAbility = options.specialAbility || this.randomFrom(SPECIAL_ABILITIES);
    this.createdAt = options.createdAt || new Date().toISOString();
  }

  generateId() {
    return 'cof-' + Math.random().toString(36).substring(2, 9);
  }

  generateName() {
    const adjective = this.randomFrom(ADJECTIVES);
    const suffix = ['fins', 'sticks', 'pus', 'cuddles'][Math.floor(Math.random() * 4)];
    return `${adjective}${suffix}`;
  }

  randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  hug() {
    if (this.cuddlinessLevel >= 8) {
      return `${this.name} wraps all ${this.tentacles} tentacles around you for an EPIC HUG! 🤗`;
    } else if (this.cuddlinessLevel >= 5) {
      return `${this.name} gives you a warm, gentle hug with 4 tentacles! 💕`;
    } else {
      return `${this.name} gives you an awkward side-hug. It's still nice though! 🤝`;
    }
  }

  swim() {
    return `${this.name} gracefully swims through the ${this.color.toLowerCase()} waters! 🌊`;
  }

  performSpecialAbility() {
    return `✨ ${this.name}'s special ability: ${this.specialAbility} ✨`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      tentacles: this.tentacles,
      cuddlinessLevel: this.cuddlinessLevel,
      specialAbility: this.specialAbility,
      createdAt: this.createdAt
    };
  }

  static getAvailableColors() {
    return [...COLORS];
  }

  static getAvailableAbilities() {
    return [...SPECIAL_ABILITIES];
  }
}

module.exports = { CuddlyOctoFishstick, ADJECTIVES, COLORS, SPECIAL_ABILITIES };
