const router = require('express').Router();
const { Category, Expense } = require('./models');

const wrap = fn => (req, res) =>
  fn(req, res).catch(e => res.status(400).json({ error: e.message }));

// Summary (must come before /expenses/:id)
router.get('/expenses/summary', wrap(async (req, res) => {
  const [t] = await Expense.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);
  const perCategory = await Expense.aggregate([
    { $group: { _id: '$category', total: { $sum: '$amount' } } },
    { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'c' } },
    { $project: { _id: 0, category: { $arrayElemAt: ['$c.name', 0] }, total: 1 } }
  ]);
  res.json({ totalSpent: t ? t.total : 0, perCategory });
}));

// List with filters + sorting
router.get('/expenses', wrap(async (req, res) => {
  const { category, paymentMethod, from, to, sortBy, order } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (paymentMethod) filter.paymentMethod = paymentMethod;
  if (from || to) filter.date = { ...(from && { $gte: new Date(from) }), ...(to && { $lte: new Date(to) }) };
  const field = sortBy === 'amount' ? 'amount' : 'date';
  res.json(await Expense.find(filter).populate('category').sort({ [field]: order === 'asc' ? 1 : -1 }));
}));

router.get('/categories', wrap(async (req, res) => res.json(await Category.find())));

// CRUD for both resources
const crud = (path, Model) => {
  router.post(path, wrap(async (req, res) => res.status(201).json(await Model.create(req.body))));
  router.get(`${path}/:id`, wrap(async (req, res) => {
    const doc = await Model.findById(req.params.id);
    doc ? res.json(doc) : res.status(404).json({ error: 'Not found' });
  }));
  router.put(`${path}/:id`, wrap(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    doc ? res.json(doc) : res.status(404).json({ error: 'Not found' });
  }));
  router.delete(`${path}/:id`, wrap(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    doc ? res.json({ message: 'Deleted' }) : res.status(404).json({ error: 'Not found' });
  }));
};
crud('/categories', Category);
crud('/expenses', Expense);

module.exports = router;