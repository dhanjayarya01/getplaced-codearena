const express = require('express');
const app = express();

app.use(express.json());

// In-memory database
let items = [
  { id: 1, name: 'Laptop', quantity: 5 },
  { id: 2, name: 'Mouse', quantity: 20 }
];

app.get('/api/items', (req, res) => {
  res.json(items);
});

// BUG 1: This route is broken. It returns undefined instead of the item.
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id == id); // Bug is actually missing logic or wrong variable?
  // TODO: Fix this to return 404 if not found, and return the item if found.
  res.json({ item: "broken" }); 
});

// BUG 2: Validation is missing
app.post('/api/items', (req, res) => {
  const { name, quantity } = req.body;
  
  // TODO: Add validation so that if name is missing or quantity is less than 0,
  // return status 400 with { error: "Invalid data" }
  
  const newItem = {
    id: items.length + 1,
    name,
    quantity
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Export app for testing, or listen if ran directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
