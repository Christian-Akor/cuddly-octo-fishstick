/**
 * Express API for the Cuddly Octo Fishstick creature management
 */

const express = require('express');
const { CuddlyOctoFishstick } = require('./creature');

const app = express();
app.use(express.json());

// In-memory storage for creatures
const creatures = new Map();

// Middleware to find creature by ID
const findCreature = (req, res, next) => {
  const creature = creatures.get(req.params.id);
  if (!creature) {
    return res.status(404).json({ error: 'Creature not found', message: 'This cuddly creature must be swimming elsewhere!' });
  }
  req.creature = creature;
  next();
};

// GET /api/creatures - List all creatures
app.get('/api/creatures', (req, res) => {
  const allCreatures = Array.from(creatures.values()).map(c => c.toJSON());
  res.json({
    count: allCreatures.length,
    creatures: allCreatures
  });
});

// POST /api/creatures - Create a new creature
app.post('/api/creatures', (req, res) => {
  try {
    const creature = new CuddlyOctoFishstick(req.body);
    creatures.set(creature.id, creature);
    res.status(201).json({
      message: `🎉 A new cuddly octo fishstick named ${creature.name} has been born!`,
      creature: creature.toJSON()
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create creature', message: error.message });
  }
});

// GET /api/creatures/:id - Get a specific creature
app.get('/api/creatures/:id', findCreature, (req, res) => {
  res.json(req.creature.toJSON());
});

// DELETE /api/creatures/:id - Release a creature back to the ocean
app.delete('/api/creatures/:id', findCreature, (req, res) => {
  const name = req.creature.name;
  creatures.delete(req.params.id);
  res.json({ message: `${name} waves goodbye with all tentacles and swims away! 👋🐙` });
});

// POST /api/creatures/:id/hug - Give a creature a hug
app.post('/api/creatures/:id/hug', findCreature, (req, res) => {
  res.json({ action: 'hug', result: req.creature.hug() });
});

// POST /api/creatures/:id/swim - Make a creature swim
app.post('/api/creatures/:id/swim', findCreature, (req, res) => {
  res.json({ action: 'swim', result: req.creature.swim() });
});

// POST /api/creatures/:id/ability - Have creature perform special ability
app.post('/api/creatures/:id/ability', findCreature, (req, res) => {
  res.json({ action: 'special_ability', result: req.creature.performSpecialAbility() });
});

// GET /api/options - Get available customization options
app.get('/api/options', (req, res) => {
  res.json({
    colors: CuddlyOctoFishstick.getAvailableColors(),
    abilities: CuddlyOctoFishstick.getAvailableAbilities()
  });
});

// Welcome route
app.get('/', (req, res) => {
  res.json({
    welcome: '🐙 Welcome to the Cuddly Octo Fishstick Sanctuary! 🐟',
    description: 'A magical place where hybrid creatures roam free.',
    endpoints: {
      'GET /api/creatures': 'List all creatures',
      'POST /api/creatures': 'Create a new creature',
      'GET /api/creatures/:id': 'Get a specific creature',
      'DELETE /api/creatures/:id': 'Release a creature',
      'POST /api/creatures/:id/hug': 'Give a creature a hug',
      'POST /api/creatures/:id/swim': 'Make a creature swim',
      'POST /api/creatures/:id/ability': 'Perform special ability',
      'GET /api/options': 'View customization options'
    }
  });
});

// Clear all creatures (for testing)
app.delete('/api/creatures', (req, res) => {
  creatures.clear();
  res.json({ message: 'All creatures have been released! The sanctuary is empty. 🌊' });
});

module.exports = { app, creatures };
