const mongoose = require("mongoose");

const TemplateSchema = mongoose.Schema(
  {
    name: String,
    template: String,
    data: String,
  },
  { collection: "templatetable" }
);

const Template = (module.exports = mongoose.model(
  "templatetable",
  TemplateSchema
));
