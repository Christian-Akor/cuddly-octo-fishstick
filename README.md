# 🐙 Cuddly Octo Fishstick Sanctuary 🐟

> A magical API where hybrid creatures roam free - part cuddly, part octopus, and part fishstick!

## 🌟 Features

- **Create** unique hybrid creatures with customizable properties
- **Interact** with your creatures - give hugs, watch them swim, and see their special abilities!
- **Manage** your creature sanctuary with full CRUD operations
- **Comprehensive Integration Test Suite** ensuring reliable creature care

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

The sanctuary opens at `http://localhost:3000`

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message & API docs |
| GET | `/api/creatures` | List all creatures |
| POST | `/api/creatures` | Create a new creature |
| GET | `/api/creatures/:id` | Get a specific creature |
| DELETE | `/api/creatures/:id` | Release a creature |
| POST | `/api/creatures/:id/hug` | Give a creature a hug 🤗 |
| POST | `/api/creatures/:id/swim` | Watch creature swim 🌊 |
| POST | `/api/creatures/:id/ability` | Perform special ability ✨ |
| GET | `/api/options` | View customization options |

## 🎨 Creature Properties

Each Cuddly Octo Fishstick has:
- **name** - A unique, adorable name
- **color** - From Rainbow to Midnight Black
- **tentacles** - Default is 8 (naturally!)
- **cuddlinessLevel** - 1-10 scale of huggability
- **specialAbility** - A unique magical power

## 📖 Example

```bash
# Create a creature
curl -X POST http://localhost:3000/api/creatures \
  -H "Content-Type: application/json" \
  -d '{"name": "Sparkles", "color": "Rainbow", "cuddlinessLevel": 10}'

# Give it a hug!
curl -X POST http://localhost:3000/api/creatures/{id}/hug
```

## 🧪 Test Coverage

This project includes comprehensive integration tests covering:
- ✅ CRUD operations
- ✅ Creature interactions
- ✅ Error handling
- ✅ End-to-end workflows

---

*Made with 💕 in the depths of the digital ocean*