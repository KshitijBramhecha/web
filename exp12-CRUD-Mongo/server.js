// server.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const mongoUrl = 'mongodb+srv://kshitijlm10b:kshitij10@cluster0.8vwslhq.mongodb.net/';
const dbName = 'crudDemo';
const collectionName = 'items';

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
let db;

async function connectToMongo() {
  try {
    const client = await MongoClient.connect(mongoUrl);
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

// Routes

// CREATE - Add a new item
app.post('/api/items', async (req, res) => {
  try {
    const item = req.body;
    const result = await db.collection(collectionName).insertOne(item);
    res.status(201).json({ 
      success: true, 
      id: result.insertedId,
      message: 'Item created successfully' 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// READ - Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await db.collection(collectionName).find({}).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE - Update an item
app.put('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedItem = req.body;
    
    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedItem }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    
    res.json({ 
      success: true, 
      message: 'Item updated successfully' 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE - Delete an item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.collection(collectionName).deleteOne({ 
      _id: new ObjectId(id) 
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    
    res.json({ 
      success: true, 
      message: 'Item deleted successfully' 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Start server
async function startServer() {
  await connectToMongo();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
