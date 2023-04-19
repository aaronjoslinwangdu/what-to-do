const Item = require('../models/ItemModel');


// @desc    Get item by id
// @route   GET /api/item/:id
const getItem = async (req, res) => {

  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  res.status(200).json(item);

}


// @desc    Get all items
// @route   GET /api/item
const getItems = async (req, res) => {

  const items = await Item.find();

  res.status(200).json(items);

}


// @desc    Get all items
// @route   GET /api/item
const getUserItems = async (req, res) => {

  const items = await Item.find({ userId: req.body.userId });

  if (!items) {
    res.status(400);
    throw new Error('User has no items');
  }

  res.status(200).json(items);

}


// @desc    Add item
// @route   POST /api/item
const createItem = async (req, res) => {

  if (!req.body.label || !req.body.userId) {
    res.status(400);
    console.log(req.body);
    throw new Error('Please add a valid item');
  }

  const item = await Item.create({
    label: req.body.label,
    description: req.body.description,
    date: req.body.date,
    userId: req.body.userId,
    status: req.body.status,
    folder: req.body.folder
  });

  res.status(200).json(item);

}


// @desc    Delete item
// @route   DEL /api/item/:id
const deleteItem = async (req, res) => {

  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  console.log(item);
  await item.deleteOne();

  res.status(200).json({ id: req.params.id });

}


module.exports = {
  getItem,
  getItems,
  getUserItems,
  createItem,
  deleteItem
}