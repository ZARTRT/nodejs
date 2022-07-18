const mongoose = require('mongoose');

const TemplateSchema = mongoose.Schema({
    name: String,
    template: String,
    data: String
}, {collection: 'template'});

const Template = module.exports = mongoose.model('template', TemplateSchema);


