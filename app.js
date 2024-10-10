const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();

// Middleware

app.use(bodyParser.json());

// Connect to MongoDB

mongoose.connect('mongodb://localhost:27017/coffee-shop', {

    useNewUrlParser: true,

    useUnifiedTopology: true

})

.then(() => console.log('MongoDB connected'))

.catch(err => console.log(err));

// Define a simple model

const ItemSchema = new mongoose.Schema({

    username: String,

    email: String,

    age: Number

});

const Item = mongoose.model('users', ItemSchema);

// Routes

// GET all items

app.get('/users', async (req, res) => {

    const items = await Item.find();

    res.json(items);

});

// POST create a new item

app.post('/users', async (req, res) => {

    const newItem = new Item(req.body);

    await newItem.save();

    res.json(newItem);

});

// Start the server

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));