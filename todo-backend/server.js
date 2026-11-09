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
    title: {
        required: true,
        type: String
    },
    description: String
});

//Create a model for todo items
const todoModel = mongoose.model('Todo', todoSchema);

//create a new todo item
app.post('/todos', async (req, res) => {
    const {title, description} = req.body;
    // const newTodo = {
    //     id: todos.length + 1,
    //     title,
    //     description
    // };
    // todos.push(newTodo);
    // console.log(todos);
    try {
        const newTodo = new Todo({title, description});
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }   
})

//Get all todo items
app.get('/todos', async (req, res) => {
    try {
        const todos = await todoModel.find();
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
})

//update a todo item by id
app.put("/todos/:id", async (req, res) => {
    try {
        const {title, description} = req.body;
        const id = req.params.id;
        const updatedTodo = await todoModel.findByIdAndUpdate(
            id,
            {title, description},
            { new: true}
        )
        if(!updatedTodo){
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json(updatedTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
})

//Delete a todo item by id
app.delete("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await todoModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
})

//Start the server
const port = 3000
app.listen(port, () => {
    console.log("Server is running on port"+ port)
})