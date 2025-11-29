/**
 * Unit tests for CuddlyOctoFishstick creature
 */

const { CuddlyOctoFishstick, ADJECTIVES, COLORS, SPECIAL_ABILITIES } = require('../src/creature');

describe('CuddlyOctoFishstick', () => {
  describe('constructor', () => {
    it('should create a creature with default values', () => {
      const creature = new CuddlyOctoFishstick();
      
      expect(creature.id).toMatch(/^cof-[a-z0-9]+$/);
      expect(creature.name).toBeTruthy();
      expect(creature.color).toBeTruthy();
      expect(creature.tentacles).toBe(8);
      expect(creature.cuddlinessLevel).toBeGreaterThanOrEqual(1);
      expect(creature.cuddlinessLevel).toBeLessThanOrEqual(10);
      expect(creature.specialAbility).toBeTruthy();
      expect(creature.createdAt).toBeTruthy();
    });

    it('should create a creature with custom values', () => {
      const options = {
        id: 'cof-custom123',
        name: 'Bubbles',
        color: 'Rainbow',
        tentacles: 10,
        cuddlinessLevel: 9,
        specialAbility: 'Can fly through dreams',
        createdAt: '2024-01-01T00:00:00.000Z'
      };
      
      const creature = new CuddlyOctoFishstick(options);
      
      expect(creature.id).toBe('cof-custom123');
      expect(creature.name).toBe('Bubbles');
      expect(creature.color).toBe('Rainbow');
      expect(creature.tentacles).toBe(10);
      expect(creature.cuddlinessLevel).toBe(9);
      expect(creature.specialAbility).toBe('Can fly through dreams');
      expect(creature.createdAt).toBe('2024-01-01T00:00:00.000Z');
    });

    it('should handle zero tentacles', () => {
      const creature = new CuddlyOctoFishstick({ tentacles: 0 });
      expect(creature.tentacles).toBe(0);
    });

    it('should handle zero cuddliness level', () => {
      const creature = new CuddlyOctoFishstick({ cuddlinessLevel: 0 });
      expect(creature.cuddlinessLevel).toBe(0);
    });
  });

  describe('hug()', () => {
    it('should return epic hug message for high cuddliness level', () => {
      const creature = new CuddlyOctoFishstick({
        name: 'Snuggles',
        tentacles: 8,
        cuddlinessLevel: 10
      });
      
      const result = creature.hug();
      
      expect(result).toContain('EPIC HUG');
      expect(result).toContain('Snuggles');
      expect(result).toContain('8 tentacles');
    });

    it('should return warm hug message for medium cuddliness level', () => {
      const creature = new CuddlyOctoFishstick({
        name: 'Wiggles',
        cuddlinessLevel: 6
      });
      
      const result = creature.hug();
      
      expect(result).toContain('warm, gentle hug');
      expect(result).toContain('Wiggles');
    });

    it('should return awkward hug message for low cuddliness level', () => {
      const creature = new CuddlyOctoFishstick({
        name: 'Shyster',
        cuddlinessLevel: 3
      });
      
      const result = creature.hug();
      
      expect(result).toContain('awkward side-hug');
      expect(result).toContain('Shyster');
    });
  });

  describe('swim()', () => {
    it('should return swim message with creature name and color', () => {
      const creature = new CuddlyOctoFishstick({
        name: 'Marina',
        color: 'Ocean Blue'
      });
      
      const result = creature.swim();
      
      expect(result).toContain('Marina');
      expect(result).toContain('ocean blue');
      expect(result).toContain('gracefully swims');
    });
  });

  describe('performSpecialAbility()', () => {
    it('should return special ability message', () => {
      const creature = new CuddlyOctoFishstick({
        name: 'Magicus',
        specialAbility: 'Can make pizzas appear'
      });
      
      const result = creature.performSpecialAbility();
      
      expect(result).toContain('Magicus');
      expect(result).toContain('Can make pizzas appear');
      expect(result).toContain('✨');
    });
  });

  describe('toJSON()', () => {
    it('should return a plain object representation', () => {
      const creature = new CuddlyOctoFishstick({
        id: 'cof-json123',
        name: 'Jsonny',
        color: 'Golden',
        tentacles: 6,
        cuddlinessLevel: 7,
        specialAbility: 'Can serialize anything',
        createdAt: '2024-06-15T12:00:00.000Z'
      });
      
      const json = creature.toJSON();
      
      expect(json).toEqual({
        id: 'cof-json123',
        name: 'Jsonny',
        color: 'Golden',
        tentacles: 6,
        cuddlinessLevel: 7,
        specialAbility: 'Can serialize anything',
        createdAt: '2024-06-15T12:00:00.000Z'
      });
    });
  });

  describe('static methods', () => {
    it('should return available colors', () => {
      const colors = CuddlyOctoFishstick.getAvailableColors();
      
      expect(colors).toEqual(COLORS);
      expect(colors).not.toBe(COLORS); // Should be a copy
    });

    it('should return available abilities', () => {
      const abilities = CuddlyOctoFishstick.getAvailableAbilities();
      
      expect(abilities).toEqual(SPECIAL_ABILITIES);
      expect(abilities).not.toBe(SPECIAL_ABILITIES); // Should be a copy
    });
  });

  describe('name generation', () => {
    it('should generate names using adjectives', () => {
      // Create multiple creatures to test randomness
      const names = [];
      for (let i = 0; i < 20; i++) {
        const creature = new CuddlyOctoFishstick();
        names.push(creature.name);
      }
      
      // At least some names should start with known adjectives
      const startsWithAdjective = names.some(name => 
        ADJECTIVES.some(adj => name.startsWith(adj))
      );
      
      expect(startsWithAdjective).toBe(true);
    });
  });
});
