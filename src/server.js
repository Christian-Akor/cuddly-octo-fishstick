/**
 * Server entry point
 */

const { app } = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🐙 Cuddly Octo Fishstick Sanctuary is now open on port ${PORT}! 🐟`);
  console.log(`Visit http://localhost:${PORT} to meet your new cuddly friends!`);
});
