const mongoose = require('mongoose');

const templateSchema = mongoose.Schema(
  {
    name: String,
    template: String,
    data: String
  },
  {
    collection: 'koatest'
  }
);

module.exports = mongoose.model('koatest', templateSchema);
