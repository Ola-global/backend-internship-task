require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use('/api', require('./routes'));

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT || 3000, () => console.log('running'));
});