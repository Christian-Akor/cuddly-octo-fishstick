/**
 * Integration tests for the Cuddly Octo Fishstick API
 * 
 * These tests verify the complete API functionality including:
 * - CRUD operations for creatures
 * - Creature interactions (hug, swim, ability)
 * - Error handling
 * - End-to-end workflows
 */

const request = require('supertest');
const { app, creatures } = require('../src/app');

describe('Cuddly Octo Fishstick API Integration Tests', () => {
  // Clear all creatures before each test
  beforeEach(() => {
    creatures.clear();
  });

  describe('GET /', () => {
    it('should return welcome message and API documentation', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.body.welcome).toContain('Cuddly Octo Fishstick');
      expect(response.body.description).toBeTruthy();
      expect(response.body.endpoints).toBeTruthy();
      expect(Object.keys(response.body.endpoints).length).toBeGreaterThan(0);
    });
  });

  describe('Creature CRUD Operations', () => {
    describe('POST /api/creatures', () => {
      it('should create a new creature with default values', async () => {
        const response = await request(app)
          .post('/api/creatures')
          .send({})
          .expect(201);
        
        expect(response.body.message).toContain('born');
        expect(response.body.creature).toBeDefined();
        expect(response.body.creature.id).toMatch(/^cof-/);
        expect(response.body.creature.tentacles).toBe(8);
      });

      it('should create a creature with custom properties', async () => {
        const customCreature = {
          name: 'TestyMcTestFace',
          color: 'Rainbow',
          tentacles: 12,
          cuddlinessLevel: 10,
          specialAbility: 'Can write perfect tests'
        };

        const response = await request(app)
          .post('/api/creatures')
          .send(customCreature)
          .expect(201);
        
        expect(response.body.creature.name).toBe('TestyMcTestFace');
        expect(response.body.creature.color).toBe('Rainbow');
        expect(response.body.creature.tentacles).toBe(12);
        expect(response.body.creature.cuddlinessLevel).toBe(10);
        expect(response.body.creature.specialAbility).toBe('Can write perfect tests');
      });

      it('should persist creature in storage', async () => {
        const createResponse = await request(app)
          .post('/api/creatures')
          .send({ name: 'PersistenceTest' })
          .expect(201);
        
        const creatureId = createResponse.body.creature.id;
        
        // Verify creature exists
        const getResponse = await request(app)
          .get(`/api/creatures/${creatureId}`)
          .expect(200);
        
        expect(getResponse.body.name).toBe('PersistenceTest');
      });
    });

    describe('GET /api/creatures', () => {
      it('should return empty list when no creatures exist', async () => {
        const response = await request(app)
          .get('/api/creatures')
          .expect(200);
        
        expect(response.body.count).toBe(0);
        expect(response.body.creatures).toEqual([]);
      });

      it('should return all creatures', async () => {
        // Create multiple creatures
        await request(app).post('/api/creatures').send({ name: 'Creature1' });
        await request(app).post('/api/creatures').send({ name: 'Creature2' });
        await request(app).post('/api/creatures').send({ name: 'Creature3' });
        
        const response = await request(app)
          .get('/api/creatures')
          .expect(200);
        
        expect(response.body.count).toBe(3);
        expect(response.body.creatures).toHaveLength(3);
        
        const names = response.body.creatures.map(c => c.name);
        expect(names).toContain('Creature1');
        expect(names).toContain('Creature2');
        expect(names).toContain('Creature3');
      });
    });

    describe('GET /api/creatures/:id', () => {
      it('should return a specific creature by ID', async () => {
        const createResponse = await request(app)
          .post('/api/creatures')
          .send({ name: 'FindMe', color: 'Golden' })
          .expect(201);
        
        const creatureId = createResponse.body.creature.id;
        
        const getResponse = await request(app)
          .get(`/api/creatures/${creatureId}`)
          .expect(200);
        
        expect(getResponse.body.name).toBe('FindMe');
        expect(getResponse.body.color).toBe('Golden');
      });

      it('should return 404 for non-existent creature', async () => {
        const response = await request(app)
          .get('/api/creatures/cof-nonexistent')
          .expect(404);
        
        expect(response.body.error).toBe('Creature not found');
      });
    });

    describe('DELETE /api/creatures/:id', () => {
      it('should delete a creature and return farewell message', async () => {
        const createResponse = await request(app)
          .post('/api/creatures')
          .send({ name: 'GoodbyeFriend' })
          .expect(201);
        
        const creatureId = createResponse.body.creature.id;
        
        const deleteResponse = await request(app)
          .delete(`/api/creatures/${creatureId}`)
          .expect(200);
        
        expect(deleteResponse.body.message).toContain('GoodbyeFriend');
        expect(deleteResponse.body.message).toContain('waves goodbye');
        
        // Verify creature no longer exists
        await request(app)
          .get(`/api/creatures/${creatureId}`)
          .expect(404);
      });

      it('should return 404 when deleting non-existent creature', async () => {
        await request(app)
          .delete('/api/creatures/cof-ghost')
          .expect(404);
      });
    });

    describe('DELETE /api/creatures', () => {
      it('should clear all creatures', async () => {
        // Create some creatures
        await request(app).post('/api/creatures').send({ name: 'One' });
        await request(app).post('/api/creatures').send({ name: 'Two' });
        
        // Verify they exist
        let listResponse = await request(app).get('/api/creatures');
        expect(listResponse.body.count).toBe(2);
        
        // Clear all
        const clearResponse = await request(app)
          .delete('/api/creatures')
          .expect(200);
        
        expect(clearResponse.body.message).toContain('released');
        
        // Verify they're gone
        listResponse = await request(app).get('/api/creatures');
        expect(listResponse.body.count).toBe(0);
      });
    });
  });

  describe('Creature Interactions', () => {
    let testCreatureId;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/creatures')
        .send({
          name: 'InteractionBuddy',
          color: 'Ocean Blue',
          cuddlinessLevel: 9,
          specialAbility: 'Can test all the things'
        });
      
      testCreatureId = response.body.creature.id;
    });

    describe('POST /api/creatures/:id/hug', () => {
      it('should return a hug response', async () => {
        const response = await request(app)
          .post(`/api/creatures/${testCreatureId}/hug`)
          .expect(200);
        
        expect(response.body.action).toBe('hug');
        expect(response.body.result).toContain('InteractionBuddy');
      });

      it('should return 404 for non-existent creature', async () => {
        await request(app)
          .post('/api/creatures/cof-invisible/hug')
          .expect(404);
      });
    });

    describe('POST /api/creatures/:id/swim', () => {
      it('should return a swim response', async () => {
        const response = await request(app)
          .post(`/api/creatures/${testCreatureId}/swim`)
          .expect(200);
        
        expect(response.body.action).toBe('swim');
        expect(response.body.result).toContain('InteractionBuddy');
        expect(response.body.result).toContain('ocean blue');
      });
    });

    describe('POST /api/creatures/:id/ability', () => {
      it('should return special ability response', async () => {
        const response = await request(app)
          .post(`/api/creatures/${testCreatureId}/ability`)
          .expect(200);
        
        expect(response.body.action).toBe('special_ability');
        expect(response.body.result).toContain('InteractionBuddy');
        expect(response.body.result).toContain('Can test all the things');
      });
    });
  });

  describe('GET /api/options', () => {
    it('should return available customization options', async () => {
      const response = await request(app)
        .get('/api/options')
        .expect(200);
      
      expect(response.body.colors).toBeInstanceOf(Array);
      expect(response.body.abilities).toBeInstanceOf(Array);
      expect(response.body.colors.length).toBeGreaterThan(0);
      expect(response.body.abilities.length).toBeGreaterThan(0);
    });
  });

  describe('End-to-End Workflows', () => {
    it('should support complete creature lifecycle', async () => {
      // 1. Check options
      const optionsResponse = await request(app).get('/api/options');
      const availableColor = optionsResponse.body.colors[0];
      
      // 2. Create creature with chosen options
      const createResponse = await request(app)
        .post('/api/creatures')
        .send({
          name: 'LifecycleCreature',
          color: availableColor,
          cuddlinessLevel: 7
        })
        .expect(201);
      
      const creatureId = createResponse.body.creature.id;
      
      // 3. Interact with creature
      await request(app)
        .post(`/api/creatures/${creatureId}/hug`)
        .expect(200);
      
      await request(app)
        .post(`/api/creatures/${creatureId}/swim`)
        .expect(200);
      
      await request(app)
        .post(`/api/creatures/${creatureId}/ability`)
        .expect(200);
      
      // 4. Verify creature still exists
      const getResponse = await request(app)
        .get(`/api/creatures/${creatureId}`)
        .expect(200);
      
      expect(getResponse.body.name).toBe('LifecycleCreature');
      
      // 5. Release creature
      await request(app)
        .delete(`/api/creatures/${creatureId}`)
        .expect(200);
      
      // 6. Verify creature is gone
      await request(app)
        .get(`/api/creatures/${creatureId}`)
        .expect(404);
    });

    it('should handle multiple creatures simultaneously', async () => {
      // Create multiple creatures
      const creatures = ['Alpha', 'Beta', 'Gamma', 'Delta'];
      const creatureIds = [];
      
      for (const name of creatures) {
        const response = await request(app)
          .post('/api/creatures')
          .send({ name });
        creatureIds.push(response.body.creature.id);
      }
      
      // Verify all exist
      const listResponse = await request(app).get('/api/creatures');
      expect(listResponse.body.count).toBe(4);
      
      // Delete some
      await request(app).delete(`/api/creatures/${creatureIds[1]}`);
      await request(app).delete(`/api/creatures/${creatureIds[3]}`);
      
      // Verify correct ones remain
      const updatedList = await request(app).get('/api/creatures');
      expect(updatedList.body.count).toBe(2);
      
      const remainingNames = updatedList.body.creatures.map(c => c.name);
      expect(remainingNames).toContain('Alpha');
      expect(remainingNames).toContain('Gamma');
      expect(remainingNames).not.toContain('Beta');
      expect(remainingNames).not.toContain('Delta');
    });
  });
});
