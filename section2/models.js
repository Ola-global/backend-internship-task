const { Schema, model } = require('mongoose');

const Category = model('Category', new Schema({
  name: { type: String, required: true, unique: true }
}));

const Expense = model('Expense', new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  date: { type: Date, default: Date.now },
  paymentMethod: { type: String, enum: ['cash', 'card', 'transfer'], default: 'cash' }
}));

module.exports = { Category, Expense };