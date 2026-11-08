//Using Express
const express = require("express");
const mongoose = require("mongoose");

//create an instance of express
const app = express();

//Middleware to parse JSON request bodies
app.use(express.json());

//Sample in-memory storage for todo items
let todos = [];

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern-app')
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

//Define a schema for todo items
const todoSchema = new mongoose.Schema({
    title: String,
    description: String
});

//Create a model for todo items
const Todo = mongoose.model('Todo', todoSchema);

//create a new todo item
app.post('/todos', (req, res) => {
    const {title, description} = req.body;
    const newTodo = {
        id: todos.length + 1,
        title,
        description
    };
    todos.push(newTodo);
    console.log(todos);
    res.status(201).json(newTodo);
})

//Get all todo items
app.get('/todos', (req, res) => {
    res.json(todos);
})

//Start the server
const port = 3000
app.listen(port, () => {
    console.log("Server is running on port"+ port)
})