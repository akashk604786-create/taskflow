const TodoItem = require("../models/TodoItem");

exports.createTodoItem = async (req, res, next) => {
  const { task, date } = req.body;
  try {
    const todoItem = new TodoItem({ task, date, user: req.userId });
    await todoItem.save();
    res.status(201).json(todoItem);
  } catch (err) {
    next(err);
  }
};

exports.getTodoItems = async (req, res, next) => {
  try {
    const todoItems = await TodoItem.find({ user: req.userId });
    res.json(todoItems);
  } catch (err) {
    next(err);
  }
};

exports.deleteTodoItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todoItem = await TodoItem.findOneAndDelete({ _id: id, user: req.userId });
    if (!todoItem) {
      return res.status(404).json({ message: "Todo item not found" });
    }
    res.status(204).json({ _id: id });
  } catch (err) {
    next(err);
  }
};

exports.markCompleted = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todoItem = await TodoItem.findOne({ _id: id, user: req.userId });
    if (!todoItem) {
      return res.status(404).json({ message: "Todo item not found" });
    }
    todoItem.completed = true;
    await todoItem.save();
    res.json(todoItem);
  } catch (err) {
    next(err);
  }
};
